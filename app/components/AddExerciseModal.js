export default function AddExerciseModal({
	isOpen,
	onClose,
	onAdd,
	exerciseName,
	onExerciseNameChange,
}) {
	if (!isOpen) return null;

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && exerciseName.trim()) {
			onAdd();
		}
	};

	return (
		<div 
			className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-modal px-0 sm:px-5 animate-fade-in"
			onClick={onClose}
		>
			<div 
				className="glass-strong rounded-t-3xl sm:rounded-2xl w-full max-w-md border-t-2 sm:border-2 border-border shadow-2xl animate-slide-up sm:animate-scale-in safe-bottom"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between px-6 py-5 border-b border-border">
					<h3 className="text-2xl font-bold text-foreground">
						Add Exercise
					</h3>
					<button
						onClick={onClose}
						className="p-2 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden"
						aria-label="Close modal"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				{/* Modal Content */}
				<div className="px-6 py-6">
					<label
						htmlFor="exercise-name"
						className="block text-foreground-secondary text-sm font-bold mb-2 ml-1"
					>
						Exercise Name
					</label>
					<input
						id="exercise-name"
						type="text"
						value={exerciseName}
						onChange={(e) => onExerciseNameChange(e.target.value)}
						onKeyPress={handleKeyPress}
						placeholder="e.g., Bench Press"
						className="w-full px-5 py-4 rounded-xl border-2 border-border text-lg font-medium bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable"
						autoFocus
						autoComplete="off"
					/>
				</div>

				{/* Modal Actions */}
				<div className="flex gap-3 px-6 pb-6">
					<button
						onClick={onClose}
						className="flex-1 py-4 text-foreground font-bold bg-surface border-2 border-border rounded-xl text-lg hover:bg-surface-hover active:bg-surface-active active:scale-[0.98] transition-all duration-fast min-h-touch-comfortable touch-feedback relative overflow-hidden"
					>
						Cancel
					</button>
					<button
						onClick={onAdd}
						disabled={!exerciseName.trim()}
						className="flex-1 py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden"
					>
						Add Exercise
					</button>
				</div>
			</div>
		</div>
	);
}
