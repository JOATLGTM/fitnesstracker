import SetTable from "./SetTable";

export default function ExerciseCard({
	exercise,
	exerciseIndex,
	planId,
	onDeleteExercise,
	onAddSet,
	onUpdateSet,
	onDeleteSet,
	onSetComplete,
	onMoveExerciseUp,
	onMoveExerciseDown,
	isFirstExercise,
	isLastExercise,
}) {
	return (
		<div className="border-2 border-border rounded-xl p-4 bg-surface-hover transition-all duration-slow shadow-md hover:shadow-lg">
			{/* Exercise Header */}
			<div className="flex items-center gap-3 mb-4">
				<div className="flex-1 min-w-0">
					<h3 className="text-lg font-bold text-foreground truncate">
						{exercise.name}
					</h3>
					<p className="text-xs text-foreground-tertiary font-medium">
						{exercise.sets?.length || 0} set
						{exercise.sets?.length !== 1 ? "s" : ""}
					</p>
				</div>
				<div className="flex items-center gap-1 flex-shrink-0">
					{typeof onMoveExerciseUp === "function" &&
						typeof onMoveExerciseDown === "function" && (
							<>
								<button
									onClick={onMoveExerciseUp}
									disabled={isFirstExercise}
									className="p-2 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden"
									aria-label="Move exercise up"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2.3}
											d="M5 15l7-7 7 7"
										/>
									</svg>
								</button>
								<button
									onClick={onMoveExerciseDown}
									disabled={isLastExercise}
									className="p-2 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover disabled:opacity-30 disabled:cursor-not-allowed rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden"
									aria-label="Move exercise down"
								>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2.3}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
							</>
						)}
					<button
						onClick={() => onDeleteExercise(planId, exercise.id)}
						className="p-2.5 text-foreground-tertiary hover:text-error hover:bg-error-bg transition-all duration-fast rounded-lg min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden flex-shrink-0"
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
								strokeWidth={2.5}
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
							/>
						</svg>
					</button>
				</div>
			</div>

			{/* Sets Table */}
			<div className="space-y-4">
				<SetTable
					key={`${planId}-${exercise.id}`}
					sets={exercise.sets}
					planId={planId}
					exerciseId={exercise.id}
					onUpdateSet={onUpdateSet}
					onDeleteSet={onDeleteSet}
					onSetComplete={(setIndex, isPR, set) => {
						if (onSetComplete) {
							onSetComplete(
								planId,
								exercise.id,
								exercise.name,
								setIndex,
								isPR,
								set
							);
						}
					}}
				/>
				<button
					onClick={() => onAddSet(planId, exercise.id)}
					className="w-full py-3 bg-surface border-2 border-dashed border-border text-foreground-secondary font-bold rounded-lg text-sm hover:border-primary hover:bg-surface-hover hover:text-primary active:bg-surface-active transition-all duration-fast min-h-touch touch-feedback relative overflow-hidden flex items-center justify-center gap-2"
				>
					<svg
						className="w-4 h-4"
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
					<span>Add Set</span>
				</button>
			</div>
		</div>
	);
}
