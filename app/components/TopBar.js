export default function TopBar({
	username,
	saveStatus,
	isSaving,
	onSave,
	onLogout,
}) {
	return (
		<header className="bg-black border-b border-gray-800 fixed top-0 left-0 right-0 z-10">
			<div className="px-4 py-4 flex justify-between items-center">
				<h1 className="text-xl font-semibold text-white">
					GET THOSE GAINS !
				</h1>
				<div className="flex items-center gap-4">
					{saveStatus && (
						<span
							className={`text-sm ${
								saveStatus === "Saving..."
									? "text-gray-400"
									: saveStatus.includes("success")
									? "text-green-400"
									: "text-red-400"
							}`}
						>
							{saveStatus}
						</span>
					)}
					<button
						onClick={onSave}
						disabled={isSaving}
						className={`px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium 
              ${
					isSaving
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-red-700 active:bg-red-800"
				} 
              transition-colors`}
					>
						{isSaving ? "Saving..." : "Save"}
					</button>
					<button
						onClick={onLogout}
						className="text-gray-300 hover:text-white active:text-gray-400 transition-colors px-3 py-2 rounded-lg"
					>
						Logout
					</button>
				</div>
			</div>
		</header>
	);
}
