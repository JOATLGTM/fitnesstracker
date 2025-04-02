export default function BottomBar({
	isAddingPlan,
	newPlanName,
	onNewPlanNameChange,
	onCreatePlan,
	onStartAddingPlan,
}) {
	return (
		<div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 p-4">
			{isAddingPlan ? (
				<div className="flex gap-2">
					<input
						type="text"
						value={newPlanName}
						onChange={(e) => onNewPlanNameChange(e.target.value)}
						placeholder="Workout plan name"
						className="flex-1 px-4 py-3 rounded-xl border border-gray-700 text-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow placeholder-gray-500"
						style={{ WebkitAppearance: "none" }}
					/>
					<button
						onClick={onCreatePlan}
						className="px-6 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
					>
						Create
					</button>
				</div>
			) : (
				<button
					onClick={onStartAddingPlan}
					className="w-full py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
				>
					+ New Workout Plan
				</button>
			)}
		</div>
	);
}
