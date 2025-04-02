export default function AddExerciseModal({
	isOpen,
	onClose,
	onAdd,
	exerciseName,
	onExerciseNameChange,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
			<div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-gray-800">
				<h3 className="text-xl font-semibold text-white mb-4">
					Add New Exercise
				</h3>
				<input
					type="text"
					value={exerciseName}
					onChange={(e) => onExerciseNameChange(e.target.value)}
					placeholder="Exercise name"
					className="w-full px-4 py-3 rounded-xl border border-gray-700 text-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow placeholder-gray-500 mb-4"
					autoFocus
				/>
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 py-3 text-white bg-gray-800 rounded-xl text-lg font-medium hover:bg-gray-700 active:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onAdd}
						className="flex-1 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
						disabled={!exerciseName.trim()}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	);
}
