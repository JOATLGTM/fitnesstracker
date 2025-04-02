"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import WorkoutPlanCard from "../components/WorkoutPlanCard";
import AddExerciseModal from "../components/AddExerciseModal";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

export default function DashboardPage() {
	const {
		user,
		isAuthenticated,
		logout,
		saveWorkoutPlans,
		loadWorkoutPlans,
	} = useAuth();
	const router = useRouter();
	const [workoutPlans, setWorkoutPlans] = useState([]);
	const [newPlanName, setNewPlanName] = useState("");
	const [isAddingPlan, setIsAddingPlan] = useState(false);
	const [expandedPlanId, setExpandedPlanId] = useState(null);
	const [isSaving, setIsSaving] = useState(false);
	const [saveStatus, setSaveStatus] = useState("");
	const [isAddingExercise, setIsAddingExercise] = useState(false);
	const [newExerciseName, setNewExerciseName] = useState("");
	const [activePlanId, setActivePlanId] = useState(null);

	// Load workout plans on mount
	useEffect(() => {
		if (user?.id) {
			loadWorkoutPlans(user.id)
				.then((plans) => {
					if (Array.isArray(plans)) {
						setWorkoutPlans(plans);
					}
				})
				.catch((error) => {
					console.error("Error loading workout plans:", error);
				});
		}
	}, [user?.id]);

	// Save workout plans whenever they change
	useEffect(() => {
		if (user?.id && workoutPlans.length > 0) {
			saveWorkoutPlans(user.id, workoutPlans);
		}
	}, [user?.id, workoutPlans]);

	// Redirect if not authenticated
	if (!isAuthenticated) {
		router.push("/");
		return null;
	}

	const createWorkoutPlan = () => {
		if (!newPlanName.trim()) return;

		const newPlan = {
			id: Date.now().toString(),
			name: newPlanName,
			exercises: [],
		};

		setWorkoutPlans([...workoutPlans, newPlan]);
		setNewPlanName("");
		setIsAddingPlan(false);
		setExpandedPlanId(newPlan.id);
	};

	const deletePlan = (planId) => {
		setWorkoutPlans(workoutPlans.filter((plan) => plan.id !== planId));
		if (expandedPlanId === planId) {
			setExpandedPlanId(null);
		}
	};

	const deleteExercise = (planId, exerciseId) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === planId) {
					return {
						...plan,
						exercises: plan.exercises.filter(
							(ex) => ex.id !== exerciseId
						),
					};
				}
				return plan;
			})
		);
	};

	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const { source, destination, type } = result;

		if (type === "PLANS") {
			const items = Array.from(workoutPlans);
			const [reorderedItem] = items.splice(source.index, 1);
			items.splice(destination.index, 0, reorderedItem);
			setWorkoutPlans(items);
		} else if (type === "EXERCISES") {
			const planId = source.droppableId;
			const plan = workoutPlans.find((p) => p.id === planId);
			if (!plan) return;

			const exercises = Array.from(plan.exercises);
			const [reorderedItem] = exercises.splice(source.index, 1);
			exercises.splice(destination.index, 0, reorderedItem);

			setWorkoutPlans(
				workoutPlans.map((p) =>
					p.id === planId ? { ...p, exercises: exercises } : p
				)
			);
		}
	};

	const addExercise = (planId) => {
		setActivePlanId(planId);
		setNewExerciseName("");
		setIsAddingExercise(true);
	};

	const handleAddExercise = () => {
		if (!newExerciseName?.trim()) return;

		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === activePlanId) {
					return {
						...plan,
						exercises: [
							...plan.exercises,
							{
								id: Date.now().toString(),
								name: newExerciseName.trim(),
								sets: [
									{
										previous: { weight: 0, reps: 0 },
										current: { weight: 0, reps: 0 },
										completed: false,
									},
								],
							},
						],
					};
				}
				return plan;
			})
		);

		setIsAddingExercise(false);
		setNewExerciseName("");
		setActivePlanId(null);
	};

	const addSet = (planId, exerciseId) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === planId) {
					return {
						...plan,
						exercises: plan.exercises.map((exercise) => {
							if (exercise.id === exerciseId) {
								return {
									...exercise,
									sets: [
										...exercise.sets,
										{
											previous: { weight: 0, reps: 0 },
											current: { weight: 0, reps: 0 },
											completed: false,
										},
									],
								};
							}
							return exercise;
						}),
					};
				}
				return plan;
			})
		);
	};

	const updateSet = (planId, exerciseId, setIndex, field, value) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === planId) {
					return {
						...plan,
						exercises: plan.exercises.map((exercise) => {
							if (exercise.id === exerciseId) {
								return {
									...exercise,
									sets: exercise.sets.map((set, idx) =>
										idx === setIndex
											? {
													...set,
													current: {
														...set.current,
														[field]: value,
													},
											  }
											: set
									),
								};
							}
							return exercise;
						}),
					};
				}
				return plan;
			})
		);
	};

	const toggleSetCompletion = (planId, exerciseId, setIndex) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === planId) {
					return {
						...plan,
						exercises: plan.exercises.map((exercise) => {
							if (exercise.id === exerciseId) {
								return {
									...exercise,
									sets: exercise.sets.map((set, idx) =>
										idx === setIndex
											? {
													...set,
													completed: !set.completed,
													previous: !set.completed
														? set.current
														: set.previous,
											  }
											: set
									),
								};
							}
							return exercise;
						}),
					};
				}
				return plan;
			})
		);

		// Trigger a save after completing a set
		if (user?.id) {
			handleSave();
		}
	};

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const togglePlan = (planId) => {
		setExpandedPlanId(expandedPlanId === planId ? null : planId);
	};

	const handleSave = async () => {
		if (!user?.id || workoutPlans.length === 0) return;

		setIsSaving(true);
		setSaveStatus("Saving...");

		try {
			// Create a deep copy of the workout plans to ensure all data is saved
			const plansToSave = JSON.parse(JSON.stringify(workoutPlans));
			const success = await saveWorkoutPlans(user.id, plansToSave);

			if (success) {
				setSaveStatus("Saved successfully!");
				// Reload the plans to ensure we have the latest data
				const loadedPlans = await loadWorkoutPlans(user.id);
				if (Array.isArray(loadedPlans)) {
					setWorkoutPlans(loadedPlans);
				}
			} else {
				setSaveStatus("Failed to save");
			}
		} catch (error) {
			console.error("Error saving workout plans:", error);
			setSaveStatus("Error saving");
		} finally {
			setIsSaving(false);
			// Clear success message after 3 seconds
			setTimeout(() => {
				setSaveStatus("");
			}, 3000);
		}
	};

	const realNames = {
		whoskawaii: "Chris",
		rvijay0204: "Vijay",
		lazobas: "Laz",
	};

	console.log(user?.username);
	console.log(realNames[user?.username]);

	return (
		<div className="min-h-screen bg-black flex flex-col">
			<TopBar
				username={realNames[user?.username]}
				saveStatus={saveStatus}
				isSaving={isSaving}
				onSave={handleSave}
				onLogout={handleLogout}
			/>

			<main className="flex-1 mt-16 mb-20 px-4 py-6">
				<DragDropContext onDragEnd={handleDragEnd}>
					<Droppable droppableId="workout-plans" type="PLANS">
						{(provided) => (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="space-y-4 mt-4"
							>
								{workoutPlans.length === 0 ? (
									<div className="text-center py-12">
										<p className="text-gray-400 text-lg">
											There are no workout plans yet
										</p>
										<p className="text-gray-500 text-sm mt-2">
											Create a new plan to get started
										</p>
									</div>
								) : (
									workoutPlans.map((plan, index) => (
										<WorkoutPlanCard
											key={plan.id}
											plan={plan}
											index={index}
											expandedPlanId={expandedPlanId}
											onTogglePlan={togglePlan}
											onDeletePlan={deletePlan}
											onAddExercise={addExercise}
											onDeleteExercise={deleteExercise}
											onAddSet={addSet}
											onUpdateSet={updateSet}
											onToggleSetCompletion={
												toggleSetCompletion
											}
										/>
									))
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</main>

			<BottomBar
				isAddingPlan={isAddingPlan}
				newPlanName={newPlanName}
				onNewPlanNameChange={setNewPlanName}
				onCreatePlan={createWorkoutPlan}
				onStartAddingPlan={() => setIsAddingPlan(true)}
			/>

			<AddExerciseModal
				isOpen={isAddingExercise}
				onClose={() => setIsAddingExercise(false)}
				onAdd={handleAddExercise}
				exerciseName={newExerciseName}
				onExerciseNameChange={setNewExerciseName}
			/>
		</div>
	);
}
