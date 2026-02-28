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
	onDeleteSet,
}) {
	return (
		<Draggable key={plan.id} draggableId={plan.id} index={index}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					className={`glass rounded-2xl border-2 border-border overflow-hidden transition-all duration-slow animate-fade-in ${
						snapshot.isDragging
							? "shadow-glow-lg scale-[1.02] border-primary"
							: "shadow-lg hover:shadow-xl"
					}`}
				>
					{/* Plan Header */}
					<div className="flex items-center justify-between px-5 py-4 bg-surface/50 border-b border-border">
						<div
							{...provided.dragHandleProps}
							className="flex-1 flex items-center gap-3 min-w-0"
						>
							<button
								onClick={() => onTogglePlan(plan.id)}
								className="flex items-center gap-3 text-foreground hover:text-foreground-secondary transition-colors duration-fast min-w-0 flex-1"
							>
								<div className="p-1.5 hover:bg-surface-hover rounded-lg transition-colors duration-fast touch-feedback relative overflow-hidden cursor-grab active:cursor-grabbing">
									<svg
										className="w-5 h-5 text-foreground-tertiary"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2.5}
											d="M4 8h16M4 16h16"
										/>
									</svg>
								</div>
								<h2 className="text-xl font-bold truncate">
									{plan.name}
								</h2>
								<span className="text-sm font-semibold text-foreground-tertiary px-2.5 py-1 bg-surface rounded-lg flex-shrink-0">
									{plan.exercises?.length || 0}
								</span>
							</button>
						</div>
						<button
							onClick={() => onDeletePlan(plan.id)}
							className="p-2.5 text-foreground-tertiary hover:text-error hover:bg-error-bg transition-all duration-fast rounded-lg ml-2 min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden flex-shrink-0"
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
									strokeWidth={2.5}
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</button>
					</div>

					{/* Plan Content */}
					{expandedPlanId === plan.id && (
						<div className="px-5 py-5 space-y-4 animate-fade-in">
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
											onDeleteSet={onDeleteSet}
										/>
									)
								)
							) : (
								<div className="text-center py-12 px-5">
									<div className="w-16 h-16 mx-auto mb-4 bg-surface rounded-2xl flex items-center justify-center">
										<svg
											className="w-8 h-8 text-foreground-tertiary"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
											/>
										</svg>
									</div>
									<p className="text-foreground-secondary font-semibold text-lg mb-2">
										No exercises yet
									</p>
									<p className="text-foreground-tertiary text-sm">
										Tap below to add your first exercise
									</p>
								</div>
							)}

							{/* Add Exercise Button */}
							<button
								onClick={() => onAddExercise(plan.id)}
								className="w-full py-4 text-center text-foreground font-bold bg-surface border-2 border-dashed border-border hover:border-primary hover:bg-surface-hover hover:text-primary active:bg-surface-active rounded-xl transition-all duration-fast min-h-touch-comfortable touch-feedback relative overflow-hidden flex items-center justify-center gap-2"
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
										strokeWidth={2.5}
										d="M12 4v16m8-8H4"
									/>
								</svg>
								<span>Add Exercise</span>
							</button>
						</div>
					)}
				</div>
			)}
		</Draggable>
	);
}
