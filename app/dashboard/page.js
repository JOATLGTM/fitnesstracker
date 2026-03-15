"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import WorkoutPlanCard from "../components/WorkoutPlanCard";
import AddExerciseModal from "../components/AddExerciseModal";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import PRCelebration from "../components/PRCelebration";

const LAST_ACTIVE_PLAN_KEY_PREFIX = "cvfitnesstracker_last_active_plan";

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

	// Header Rest Timer state
	const [restDuration] = useState(90);
	const [restTimeLeft, setRestTimeLeft] = useState(0);
	const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);

	// PR Celebration state
	const [isPRCelebrationVisible, setIsPRCelebrationVisible] =
		useState(false);
	const [prData, setPRData] = useState(null);

	// Header rest timer countdown
	useEffect(() => {
		if (!isRestTimerRunning || restTimeLeft <= 0) {
			return;
		}

		const intervalId = setInterval(() => {
			setRestTimeLeft((prev) => {
				if (prev <= 1) {
					setIsRestTimerRunning(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, [isRestTimerRunning, restTimeLeft]);

	useEffect(() => {
		if (user?.id) {
			loadWorkoutPlans(user.id)
				.then((plans) => {
					if (Array.isArray(plans)) {
						setWorkoutPlans(plans);

						if (plans.length > 0) {
							let initialPlanId = plans[0].id;

							try {
								const storageKey = `${LAST_ACTIVE_PLAN_KEY_PREFIX}_${user.id}`;
								const storedPlanId =
									window.localStorage.getItem(storageKey);
								if (
									storedPlanId &&
									plans.some(
										(plan) => plan.id === storedPlanId
									)
								) {
									initialPlanId = storedPlanId;
								}
							} catch (error) {
								console.error(
									"Error reading last active plan from storage:",
									error
								);
							}

							setExpandedPlanId(initialPlanId);
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

		const updatedPlans = [...workoutPlans, newPlan];
		setWorkoutPlans(updatedPlans);
		setNewPlanName("");
		setIsAddingPlan(false);
		setExpandedPlanId(newPlan.id);

		if (user?.id) {
			try {
				const storageKey = `${LAST_ACTIVE_PLAN_KEY_PREFIX}_${user.id}`;
				window.localStorage.setItem(storageKey, newPlan.id);
			} catch (error) {
				console.error(
					"Error saving last active plan to storage:",
					error
				);
			}
		}
	};

	const handleDeletePlan = (planId) => {
		setPlanToDelete(planId);
		setIsDeleteModalOpen(true);
	};

	const confirmDeletePlan = () => {
		if (planToDelete) {
			const remainingPlans = workoutPlans.filter(
				(plan) => plan.id !== planToDelete
			);
			setWorkoutPlans(remainingPlans);

			if (expandedPlanId === planToDelete) {
				const nextPlanId = remainingPlans[0]?.id || null;
				setExpandedPlanId(nextPlanId);

				if (user?.id && nextPlanId) {
					try {
						const storageKey = `${LAST_ACTIVE_PLAN_KEY_PREFIX}_${user.id}`;
						window.localStorage.setItem(storageKey, nextPlanId);
					} catch (error) {
						console.error(
							"Error updating last active plan in storage:",
							error
						);
					}
				}
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
		const numericValue =
			value === "" || Number.isNaN(Number(value))
				? 0
				: parseFloat(value);

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
		if (user?.id) {
			try {
				const storageKey = `${LAST_ACTIVE_PLAN_KEY_PREFIX}_${user.id}`;
				window.localStorage.setItem(storageKey, planId);
			} catch (error) {
				console.error(
					"Error saving last active plan to storage:",
					error
				);
			}
		}
	};

	const movePlan = (planId, direction) => {
		const index = workoutPlans.findIndex((plan) => plan.id === planId);
		if (index === -1) return;

		const newIndex = direction === "up" ? index - 1 : index + 1;
		if (newIndex < 0 || newIndex >= workoutPlans.length) return;

		const updatedPlans = [...workoutPlans];
		const [movedPlan] = updatedPlans.splice(index, 1);
		updatedPlans.splice(newIndex, 0, movedPlan);

		setWorkoutPlans(updatedPlans);

		if (user?.id) {
			try {
				const storageKey = `${LAST_ACTIVE_PLAN_KEY_PREFIX}_${user.id}`;
				window.localStorage.setItem(storageKey, movedPlan.id);
			} catch (error) {
				console.error(
					"Error saving last active plan to storage:",
					error
				);
			}
		}
	};

	const renamePlan = (planId, newName) => {
		const trimmed = typeof newName === "string" ? newName.trim() : "";
		if (!trimmed) return;

		setWorkoutPlans(
			workoutPlans.map((plan) =>
				plan.id === planId ? { ...plan, name: trimmed } : plan
			)
		);
	};

	const moveExercise = (planId, exerciseId, direction) => {
		setWorkoutPlans(
			workoutPlans.map((plan) => {
				if (plan.id !== planId) return plan;

				const exercises = [...plan.exercises];
				const index = exercises.findIndex(
					(ex) => ex.id === exerciseId
				);
				if (index === -1) return plan;

				const newIndex = direction === "up" ? index - 1 : index + 1;
				if (newIndex < 0 || newIndex >= exercises.length) {
					return plan;
				}

				const [movedExercise] = exercises.splice(index, 1);
				exercises.splice(newIndex, 0, movedExercise);

				return {
					...plan,
					exercises,
				};
			})
		);
	};

	const handleSetComplete = (
		planId,
		exerciseId,
		exerciseName,
		setIndex,
		isPR,
		set
	) => {
		// Show PR celebration if it's a PR
		if (isPR && set.current.weight && set.current.reps) {
			setPRData({
				exercise: exerciseName,
				weight: set.current.weight,
				reps: set.current.reps,
			});
			setIsPRCelebrationVisible(true);
		}

		// Start header rest timer
		setRestTimeLeft(restDuration);
		setIsRestTimerRunning(true);
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

	const showSuccessBanner = saveStatus && saveStatus.includes("success");

	return (
		<div className="min-h-screen bg-background flex flex-col safe-top safe-bottom">
			{/* Fixed top success banner */}
			{showSuccessBanner && (
				<div
					className="fixed top-0 left-0 right-0 z-toast safe-top bg-success-bg text-success border-b border-success/30 flex flex-col min-h-[4.5rem] animate-slide-down shadow-md"
					role="status"
					aria-live="polite"
				>
					<div className="flex-1 min-h-[1.5rem]" aria-hidden />
					<div className="flex items-center justify-center gap-2 px-6 flex-shrink-0">
						<svg
							className="w-5 h-5 flex-shrink-0"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
						<span className="font-bold text-sm">{saveStatus}</span>
					</div>
					<div className="flex-1 min-h-[1.5rem]" aria-hidden />
				</div>
			)}

			<TopBar
				username={user?.username}
				saveStatus={saveStatus}
				isSaving={isSaving}
				onSave={handleSave}
				onLogout={handleLogout}
				timerSeconds={restTimeLeft}
				isTimerRunning={isRestTimerRunning}
				onTimerReset={() => {
					setRestTimeLeft(restDuration);
					setIsRestTimerRunning(false);
				}}
			/>

			<div className="flex-1 flex flex-col pt-[72px] pb-[88px] min-w-0 overflow-hidden">
				{/* Horizontal Workout Plan Tabs */}
				<div className="px-5 py-4 overflow-x-auto momentum-scroll border-b border-border bg-background-secondary shrink-0">
					<div className="flex gap-3 min-w-max">
						{workoutPlans.map((plan) => (
							<button
								key={plan.id}
								onClick={() => togglePlan(plan.id)}
								className={`px-5 py-3 rounded-xl text-base font-bold transition-all duration-fast whitespace-nowrap min-h-touch touch-feedback relative overflow-hidden ${
									expandedPlanId === plan.id
										? "bg-primary text-white shadow-glow"
										: "bg-surface text-foreground-secondary hover:bg-surface-hover hover:text-foreground active:bg-surface-active"
								}`}
							>
								<span className="flex items-center gap-2">
									{plan.name}
									{plan.exercises?.length > 0 && (
										<span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
											expandedPlanId === plan.id
												? "bg-white/20 text-white"
												: "bg-surface-active text-foreground-tertiary"
										}`}>
											{plan.exercises.length}
										</span>
									)}
								</span>
							</button>
						))}
					</div>
				</div>

				<main className="flex-1 min-w-0 px-5 py-5 overflow-y-auto overflow-x-hidden momentum-scroll">
					<div className="space-y-4 pb-4 min-w-0">
						{workoutPlans.length === 0 ? (
							<div className="text-center py-20 px-5 animate-fade-in">
								<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
									<svg
										className="w-12 h-12 text-primary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
										/>
									</svg>
								</div>
								<h3 className="text-2xl font-bold text-foreground mb-3">
									No Workout Plans Yet
								</h3>
								<p className="text-foreground-secondary text-base mb-2">
									Create your first plan to get started
								</p>
								<p className="text-foreground-tertiary text-sm">
									Tap the button below to begin
								</p>
							</div>
						) : (
							workoutPlans
								.filter((plan) => plan.id === expandedPlanId)
								.map((plan, index) => (
									<WorkoutPlanCard
										key={plan.id}
										plan={plan}
										index={index}
										expandedPlanId={expandedPlanId}
										onTogglePlan={togglePlan}
										onDeletePlan={handleDeletePlan}
										onAddExercise={addExercise}
										onDeleteExercise={deleteExercise}
										onAddSet={addSet}
										onUpdateSet={updateSet}
										onDeleteSet={deleteSet}
										onSetComplete={handleSetComplete}
										onMovePlanUp={() =>
											movePlan(plan.id, "up")
										}
										onMovePlanDown={() =>
											movePlan(plan.id, "down")
										}
										onMoveExercise={moveExercise}
										onRenamePlan={renamePlan}
									/>
								))
						)}
					</div>
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

			<PRCelebration
				isVisible={isPRCelebrationVisible}
				exercise={prData?.exercise}
				weight={prData?.weight}
				reps={prData?.reps}
				onClose={() => {
					setIsPRCelebrationVisible(false);
					setPRData(null);
				}}
			/>
		</div>
	);
}
