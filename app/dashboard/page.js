"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

	return (
		<div className="min-h-screen bg-black flex flex-col">
			{/* Top App Bar */}
			<header className="bg-black border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
				<div className="px-4 py-4 flex justify-between items-center">
					<h1 className="text-xl font-semibold text-white">
						GET THOSE GAINS {(user?.username).toUpperCase()}
					</h1>
					<div className="flex items-center gap-4">
						{saveStatus && (
							<span
								className={`text-sm ${
									saveStatus === "Saving..."
										? "text-gray-400"
										: saveStatus.includes("success")
										? "text-green-400"
										: "text-red-400"
								}`}
							>
								{saveStatus}
							</span>
						)}
						<button
							onClick={handleSave}
							disabled={isSaving}
							className={`px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium 
								${
									isSaving
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-red-700 active:bg-red-800"
								} 
								transition-colors`}
						>
							{isSaving ? "Saving..." : "Save"}
						</button>
						<button
							onClick={handleLogout}
							className="text-gray-300 hover:text-white active:text-gray-400 transition-colors px-3 py-2 rounded-lg"
						>
							Logout
						</button>
					</div>
				</div>
			</header>

			{/* Main Content */}
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
										<Draggable
											key={plan.id}
											draggableId={plan.id}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													className={`bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden ${
														snapshot.isDragging
															? "shadow-lg ring-2 ring-red-500"
															: ""
													}`}
												>
													{/* Plan Header */}
													<div className="flex items-center justify-between px-4 py-4 bg-gray-800">
														<div
															{...provided.dragHandleProps}
															className="flex-1 flex items-center gap-3"
														>
															<button
																onClick={() =>
																	togglePlan(
																		plan.id
																	)
																}
																className="flex items-center gap-2 text-white hover:text-gray-200"
															>
																<svg
																	className={`w-6 h-6 transform transition-transform ${
																		expandedPlanId ===
																		plan.id
																			? "rotate-180"
																			: ""
																	}`}
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={
																			2
																		}
																		d="M19 9l-7 7-7-7"
																	/>
																</svg>
																<h2 className="text-xl font-semibold">
																	{plan.name}
																</h2>
															</button>
														</div>
														<button
															onClick={() =>
																deletePlan(
																	plan.id
																)
															}
															className="p-2 text-gray-400 hover:text-red-500 transition-colors"
															aria-label="Delete plan"
														>
															<svg
																className="w-5 h-5"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={
																		2
																	}
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
														</button>
													</div>

													{/* Plan Content */}
													{expandedPlanId ===
														plan.id && (
														<div className="px-4 pb-4 space-y-4">
															{plan.exercises &&
															plan.exercises
																.length > 0 ? (
																<Droppable
																	droppableId={
																		plan.id
																	}
																	type="EXERCISES"
																>
																	{(
																		provided
																	) => (
																		<div
																			{...provided.droppableProps}
																			ref={
																				provided.innerRef
																			}
																			className="space-y-4 mt-4"
																		>
																			{plan.exercises.map(
																				(
																					exercise,
																					exerciseIndex
																				) => (
																					<Draggable
																						key={
																							exercise.id
																						}
																						draggableId={
																							exercise.id
																						}
																						index={
																							exerciseIndex
																						}
																					>
																						{(
																							provided,
																							snapshot
																						) => (
																							<div
																								ref={
																									provided.innerRef
																								}
																								{...provided.draggableProps}
																								className={`border border-gray-800 rounded-xl p-4 bg-gray-800 ${
																									snapshot.isDragging
																										? "shadow-lg ring-2 ring-red-500"
																										: ""
																								}`}
																							>
																								{/* Exercise content */}
																								<div className="space-y-3">
																									<div className="flex items-center gap-2">
																										<div
																											{...provided.dragHandleProps}
																											className="p-1 text-gray-400 hover:text-white cursor-grab active:cursor-grabbing"
																										>
																											<svg
																												className="w-5 h-5"
																												fill="none"
																												stroke="currentColor"
																												viewBox="0 0 24 24"
																											>
																												<path
																													strokeLinecap="round"
																													strokeLinejoin="round"
																													strokeWidth={
																														2
																													}
																													d="M4 8h16M4 16h16"
																												/>
																											</svg>
																										</div>
																										<div className="flex-1 text-lg font-medium px-3 py-2 text-white">
																											{
																												exercise.name
																											}
																										</div>
																										<button
																											onClick={() =>
																												deleteExercise(
																													plan.id,
																													exercise.id
																												)
																											}
																											className="p-2 text-gray-400 hover:text-red-500 transition-colors"
																											aria-label="Delete exercise"
																										>
																											<svg
																												className="w-5 h-5"
																												fill="none"
																												stroke="currentColor"
																												viewBox="0 0 24 24"
																											>
																												<path
																													strokeLinecap="round"
																													strokeLinejoin="round"
																													strokeWidth={
																														2
																													}
																													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																												/>
																											</svg>
																										</button>
																									</div>

																									{/* Sets */}
																									<div className="space-y-4">
																										<div className="overflow-x-auto">
																											<table className="w-full min-w-full table-fixed">
																												<thead>
																													<tr className="text-gray-300 text-sm">
																														<th className="text-left py-2 w-[10%]">
																															#
																														</th>
																														<th className="text-left py-2 w-[25%]">
																															Previous
																														</th>
																														<th className="text-left py-2 w-[25%]">
																															lbs
																														</th>
																														<th className="text-left py-2 w-[25%]">
																															Reps
																														</th>
																														<th className="text-left py-2 w-[15%]"></th>
																													</tr>
																												</thead>
																												<tbody>
																													{exercise.sets.map(
																														(
																															set,
																															setIndex
																														) => (
																															<tr
																																key={
																																	setIndex
																																}
																																className="border-t border-gray-700"
																															>
																																<td className="py-2 text-gray-300">
																																	{setIndex +
																																		1}
																																</td>
																																<td className="py-2 text-gray-400 whitespace-nowrap">
																																	{
																																		set
																																			.previous
																																			.weight
																																	}{" "}
																																	×{" "}
																																	{
																																		set
																																			.previous
																																			.reps
																																	}
																																</td>
																																<td className="py-2">
																																	<input
																																		type="number"
																																		value={
																																			set
																																				.current
																																				.weight
																																		}
																																		onChange={(
																																			e
																																		) =>
																																			updateSet(
																																				plan.id,
																																				exercise.id,
																																				setIndex,
																																				"weight",
																																				Number(
																																					e
																																						.target
																																						.value
																																				)
																																			)
																																		}
																																		className="w-16 px-2 py-1 text-center border border-gray-700 rounded-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
																																		placeholder="0"
																																		min="0"
																																	/>
																																</td>
																																<td className="py-2">
																																	<input
																																		type="number"
																																		value={
																																			set
																																				.current
																																				.reps
																																		}
																																		onChange={(
																																			e
																																		) =>
																																			updateSet(
																																				plan.id,
																																				exercise.id,
																																				setIndex,
																																				"reps",
																																				Number(
																																					e
																																						.target
																																						.value
																																				)
																																			)
																																		}
																																		className="w-16 px-2 py-1 text-center border border-gray-700 rounded-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
																																		placeholder="0"
																																		min="0"
																																	/>
																																</td>
																																<td className="py-2">
																																	<button
																																		onClick={() =>
																																			toggleSetCompletion(
																																				plan.id,
																																				exercise.id,
																																				setIndex
																																			)
																																		}
																																		className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
																																			set.completed
																																				? "bg-green-500 hover:bg-green-600"
																																				: "bg-gray-700 hover:bg-gray-600"
																																		}`}
																																	>
																																		<svg
																																			className="w-5 h-5 text-white"
																																			fill="none"
																																			stroke="currentColor"
																																			viewBox="0 0 24 24"
																																		>
																																			<path
																																				strokeLinecap="round"
																																				strokeLinejoin="round"
																																				strokeWidth={
																																					2
																																				}
																																				d="M5 13l4 4L19 7"
																																			/>
																																		</svg>
																																	</button>
																																</td>
																															</tr>
																														)
																													)}
																												</tbody>
																											</table>
																										</div>
																										<button
																											onClick={() =>
																												addSet(
																													plan.id,
																													exercise.id
																												)
																											}
																											className="w-full py-2 bg-gray-900 border border-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors"
																										>
																											+
																											Add
																											Set
																										</button>
																									</div>
																								</div>
																							</div>
																						)}
																					</Draggable>
																				)
																			)}
																			{
																				provided.placeholder
																			}
																		</div>
																	)}
																</Droppable>
															) : (
																<div className="text-center py-8">
																	<p className="text-gray-400">
																		No
																		exercises
																		in this
																		plan
																	</p>
																	<p className="text-gray-500 text-sm mt-2">
																		Add an
																		exercise
																		to get
																		started
																	</p>
																</div>
															)}

															{/* Add Exercise Button */}
															<button
																onClick={() =>
																	addExercise(
																		plan.id
																	)
																}
																className="w-full py-3 text-center text-white bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 active:bg-gray-600 transition-colors font-medium"
															>
																+ Add Exercise
															</button>
														</div>
													)}
												</div>
											)}
										</Draggable>
									))
								)}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</main>

			{/* Bottom Navigation/Action Bar */}
			<div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
				{isAddingPlan ? (
					<div className="flex gap-2">
						<input
							type="text"
							value={newPlanName}
							onChange={(e) => setNewPlanName(e.target.value)}
							placeholder="Workout plan name"
							className="flex-1 px-4 py-3 rounded-xl border border-gray-700 text-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow placeholder-gray-500"
							style={{ WebkitAppearance: "none" }}
						/>
						<button
							onClick={createWorkoutPlan}
							className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
						>
							Create
						</button>
					</div>
				) : (
					<button
						onClick={() => setIsAddingPlan(true)}
						className="w-full py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
					>
						+ New Workout Plan
					</button>
				)}
			</div>

			{/* Exercise Modal */}
			{isAddingExercise && (
				<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
					<div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-gray-800">
						<h3 className="text-xl font-semibold text-white mb-4">
							Add New Exercise
						</h3>
						<input
							type="text"
							value={newExerciseName}
							onChange={(e) => setNewExerciseName(e.target.value)}
							placeholder="Exercise name"
							className="w-full px-4 py-3 rounded-xl border border-gray-700 text-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow placeholder-gray-500 mb-4"
							autoFocus
						/>
						<div className="flex gap-3">
							<button
								onClick={() => setIsAddingExercise(false)}
								className="flex-1 py-3 text-white bg-gray-800 rounded-xl text-lg font-medium hover:bg-gray-700 active:bg-gray-600 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleAddExercise}
								className="flex-1 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
								disabled={!newExerciseName.trim()}
							>
								Add
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
