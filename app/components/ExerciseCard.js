import { Draggable } from "react-beautiful-dnd";
import SetTable from "./SetTable";

export default function ExerciseCard({
	exercise,
	exerciseIndex,
	planId,
	onDeleteExercise,
	onAddSet,
	onUpdateSet,
	onToggleSetCompletion,
}) {
	return (
		<Draggable
			key={exercise.id}
			draggableId={exercise.id}
			index={exerciseIndex}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={`border border-gray-800 rounded-xl p-4 bg-gray-800 mt-4 ${
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
										strokeWidth={2}
										d="M4 8h16M4 16h16"
									/>
								</svg>
							</div>
							<div className="flex-1 text-lg font-medium px-3 py-2 text-white">
								{exercise.name}
							</div>
							<button
								onClick={() =>
									onDeleteExercise(planId, exercise.id)
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
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</button>
						</div>

						{/* Sets */}
						<div className="space-y-4">
							<SetTable
								sets={exercise.sets}
								planId={planId}
								exerciseId={exercise.id}
								onUpdateSet={onUpdateSet}
								onToggleSetCompletion={onToggleSetCompletion}
							/>
							<button
								onClick={() => onAddSet(planId, exercise.id)}
								className="w-full py-2 bg-gray-900 border border-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 active:bg-gray-700 transition-colors"
							>
								+ Add Set
							</button>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
}
