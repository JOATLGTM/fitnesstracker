export default function DeleteConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	itemName,
}) {
	if (!isOpen) return null;

	return (
		<div 
			className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-modal px-0 sm:px-5 animate-fade-in"
			onClick={onClose}
		>
			<div 
				className="glass-strong rounded-t-3xl sm:rounded-2xl w-full max-w-md border-t-2 sm:border-2 border-error/40 shadow-2xl animate-slide-up sm:animate-scale-in safe-bottom"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Modal Header */}
				<div className="flex items-start gap-4 px-6 py-5">
					<div className="flex-shrink-0 w-12 h-12 bg-error-bg rounded-xl flex items-center justify-center">
						<svg
							className="w-6 h-6 text-error"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-xl font-bold text-foreground mb-2">
							Delete Workout?
						</h3>
						<p className="text-foreground-secondary text-base leading-relaxed">
							Are you sure you want to delete{" "}
							<span className="font-bold text-foreground">
								"{itemName}"
							</span>
							? This action cannot be undone.
						</p>
					</div>
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
						onClick={onConfirm}
						className="flex-1 py-4 bg-error text-white rounded-xl text-lg font-bold hover:bg-error/90 active:bg-error/80 active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden"
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
