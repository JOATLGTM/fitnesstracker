import { Draggable } from "react-beautiful-dnd";
import ExerciseCard from "./ExerciseCard";

export default function WorkoutPlanCard({
	plan,
	index,
	expandedPlanId,
	onTogglePlan,
	onDeletePlan,
	onAddExercise,
	onDeleteExercise,
	onAddSet,
	onUpdateSet,
	onToggleSetCompletion,
}) {
	return (
		<Draggable key={plan.id} draggableId={plan.id} index={index}>
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
								onClick={() => onTogglePlan(plan.id)}
								className="flex items-center gap-2 text-white hover:text-gray-200"
							>
								<svg
									className={`w-6 h-6 transform transition-transform ${
										expandedPlanId === plan.id
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
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
								<h2 className="text-xl font-semibold">
									{plan.name}
								</h2>
							</button>
						</div>
						<button
							onClick={() => onDeletePlan(plan.id)}
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
									strokeWidth={2}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>

					{/* Plan Content */}
					{expandedPlanId === plan.id && (
						<div className="px-4 pb-4 space-y-4">
							{plan.exercises && plan.exercises.length > 0 ? (
								plan.exercises.map(
									(exercise, exerciseIndex) => (
										<ExerciseCard
											key={exercise.id}
											exercise={exercise}
											exerciseIndex={exerciseIndex}
											planId={plan.id}
											onDeleteExercise={onDeleteExercise}
											onAddSet={onAddSet}
											onUpdateSet={onUpdateSet}
											onToggleSetCompletion={
												onToggleSetCompletion
											}
										/>
									)
								)
							) : (
								<div className="text-center py-8">
									<p className="text-gray-400">
										No exercises in this plan
									</p>
									<p className="text-gray-500 text-sm mt-2">
										Add an exercise to get started
									</p>
								</div>
							)}

							{/* Add Exercise Button */}
							<button
								onClick={() => onAddExercise(plan.id)}
								className="w-full py-3 text-center text-white bg-gray-800 border border-gray-700 rounded-xl hover:bg-gray-700 active:bg-gray-600 transition-colors font-medium"
							>
								+ Add Exercise
							</button>
						</div>
					)}
				</div>
			)}
		</Draggable>
	);
}
