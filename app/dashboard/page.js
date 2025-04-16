"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import WorkoutPlanCard from "../components/WorkoutPlanCard";
import AddExerciseModal from "../components/AddExerciseModal";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";

// Dynamically import DragDropContext and Droppable to avoid SSR issues
const DragDropContext = dynamic(
	() => import("react-beautiful-dnd").then((mod) => mod.DragDropContext),
	{ ssr: false }
);
const Droppable = dynamic(
	() => import("react-beautiful-dnd").then((mod) => mod.Droppable),
	{ ssr: false }
);

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
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [planToDelete, setPlanToDelete] = useState(null);

	// Load workout plans on mount
	useEffect(() => {
		if (user?.id) {
			loadWorkoutPlans(user.id)
				.then((plans) => {
					if (Array.isArray(plans)) {
						setWorkoutPlans(plans);
						if (plans.length > 0) {
							setExpandedPlanId(plans[0].id);
						}
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

	const handleDeletePlan = (planId) => {
		setPlanToDelete(planId);
		setIsDeleteModalOpen(true);
	};

	const confirmDeletePlan = () => {
		if (planToDelete) {
			setWorkoutPlans(
				workoutPlans.filter((plan) => plan.id !== planToDelete)
			);
			if (expandedPlanId === planToDelete) {
				setExpandedPlanId(workoutPlans[0]?.id || null);
			}
			setIsDeleteModalOpen(false);
			setPlanToDelete(null);
		}
	};

	const cancelDeletePlan = () => {
		setIsDeleteModalOpen(false);
		setPlanToDelete(null);
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

	const deleteSet = (planId, exerciseId, setIndex) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id === planId) {
					return {
						...plan,
						exercises: plan.exercises.map((exercise) => {
							if (exercise.id === exerciseId) {
								return {
									...exercise,
									sets: exercise.sets.filter(
										(_, idx) => idx !== setIndex
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
		// Convert value to string to handle leading zeros
		const stringValue = value.toString();

		// If the value starts with '0' and has more than one digit, remove the leading zero
		const processedValue =
			stringValue.startsWith("0") && stringValue.length > 1
				? stringValue.slice(1)
				: stringValue;

		// Convert back to number for storage
		const numericValue = parseFloat(processedValue);

		// Update the state with the processed value
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
														[field]: numericValue,
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

	const handleLogout = () => {
		logout();
		router.push("/");
	};

	const togglePlan = (planId) => {
		setExpandedPlanId(planId);
	};

	const handleSave = async () => {
		if (!user?.id || workoutPlans.length === 0) return;

		setIsSaving(true);
		setSaveStatus("Saving...");

		try {
			// Update previous values with current values before saving
			const updatedPlans = workoutPlans.map((plan) => ({
				...plan,
				exercises: plan.exercises.map((exercise) => ({
					...exercise,
					sets: exercise.sets.map((set) => ({
						...set,
						previous: {
							weight: set.current.weight,
							reps: set.current.reps,
						},
					})),
				})),
			}));

			// Create a deep copy of the updated workout plans
			const plansToSave = JSON.parse(JSON.stringify(updatedPlans));
			const success = await saveWorkoutPlans(user.id, plansToSave);

			if (success) {
				setWorkoutPlans(updatedPlans);
				setSaveStatus("Saved successfully!");
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

	return (
		<div className="min-h-screen bg-black flex flex-col">
			<TopBar
				username={user?.username}
				saveStatus={saveStatus}
				isSaving={isSaving}
				onSave={handleSave}
				onLogout={handleLogout}
			/>

			<div className="flex-1 flex flex-col mt-16 pb-24">
				{/* Horizontal Workout List */}
				<div className="px-4 py-2 overflow-x-auto">
					<div className="flex gap-4 min-w-max">
						{workoutPlans.map((plan) => (
							<button
								key={plan.id}
								onClick={() => togglePlan(plan.id)}
								className={`px-6 py-3 rounded-xl text-lg font-medium transition-colors ${
									expandedPlanId === plan.id
										? "bg-red-600 text-white"
										: "bg-gray-800 text-gray-300 hover:bg-gray-700"
								}`}
							>
								{plan.name}
							</button>
						))}
					</div>
				</div>

				<main className="flex-1 px-4 py-6 overflow-y-auto">
					<DragDropContext onDragEnd={handleDragEnd}>
						<Droppable droppableId="workout-plans" type="PLANS">
							{(provided) => (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									className="space-y-4"
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
										workoutPlans
											.filter(
												(plan) =>
													plan.id === expandedPlanId
											)
											.map((plan, index) => (
												<WorkoutPlanCard
													key={plan.id}
													plan={plan}
													index={index}
													expandedPlanId={
														expandedPlanId
													}
													onTogglePlan={togglePlan}
													onDeletePlan={
														handleDeletePlan
													}
													onAddExercise={addExercise}
													onDeleteExercise={
														deleteExercise
													}
													onAddSet={addSet}
													onUpdateSet={updateSet}
													onDeleteSet={deleteSet}
												/>
											))
									)}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</main>
			</div>

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

			<DeleteConfirmationModal
				isOpen={isDeleteModalOpen}
				onClose={cancelDeletePlan}
				onConfirm={confirmDeletePlan}
				itemName={
					workoutPlans.find((plan) => plan.id === planToDelete)
						?.name || ""
				}
			/>
		</div>
	);
}
