export default function BottomBar({
	isAddingPlan,
	newPlanName,
	onNewPlanNameChange,
	onCreatePlan,
	onStartAddingPlan,
}) {
	const handleKeyPress = (e) => {
		if (e.key === "Enter" && newPlanName.trim()) {
			onCreatePlan();
		}
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 glass-strong border-t border-border safe-bottom z-fixed animate-slide-up">
			<div className="px-5 py-4">
				{isAddingPlan ? (
					<div className="flex gap-3 animate-scale-in">
						<input
							type="text"
							value={newPlanName}
							onChange={(e) => onNewPlanNameChange(e.target.value)}
							onKeyPress={handleKeyPress}
							placeholder="Workout plan name"
							className="flex-1 px-5 py-4 rounded-xl border-2 border-border text-lg font-medium bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable"
							style={{ WebkitAppearance: "none" }}
							autoFocus
							autoComplete="off"
						/>
						<button
							onClick={onCreatePlan}
							disabled={!newPlanName.trim()}
							className="px-6 py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:bg-primary-active active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-fast shadow-lg min-h-touch-comfortable min-w-touch-comfortable touch-feedback relative overflow-hidden flex items-center justify-center"
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
									strokeWidth={3}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</button>
					</div>
				) : (
					<button
						onClick={onStartAddingPlan}
						className="w-full py-4 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden flex items-center justify-center gap-2"
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
								strokeWidth={3}
								d="M12 4v16m8-8H4"
							/>
						</svg>
						<span>New Workout Plan</span>
					</button>
				)}
			</div>
		</div>
	);
}
