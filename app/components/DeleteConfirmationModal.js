export default function DeleteConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	itemName,
}) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
			<div className="bg-gray-900 rounded-2xl w-full max-w-md p-6 border border-gray-800">
				<h3 className="text-xl font-semibold text-white mb-4">
					Delete Workout
				</h3>
				<p className="text-gray-300 mb-6">
					Are you sure you want to delete "{itemName}"? This action
					cannot be undone.
				</p>
				<div className="flex gap-3">
					<button
						onClick={onClose}
						className="flex-1 py-3 text-white bg-gray-800 rounded-xl text-lg font-medium hover:bg-gray-700 active:bg-gray-600 transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className="flex-1 py-3 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
					>
						Yes, Delete
					</button>
				</div>
			</div>
		</div>
	);
}
