export default function SetTable({
	sets,
	planId,
	exerciseId,
	onUpdateSet,
	onDeleteSet,
}) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full min-w-full table-fixed">
				<thead>
					<tr className="text-gray-300 text-sm">
						<th className="text-left py-2 w-[10%]">#</th>
						<th className="text-left py-2 w-[25%]">Previous</th>
						<th className="text-left py-2 w-[25%]">lbs</th>
						<th className="text-left py-2 w-[25%]">Reps</th>
						<th className="text-left py-2 w-[15%]"></th>
					</tr>
				</thead>
				<tbody>
					{sets.map((set, setIndex) => (
						<tr key={setIndex} className="border-t border-gray-700">
							<td className="py-2 text-gray-300">
								{setIndex + 1}
							</td>
							<td className="py-2 text-gray-400 whitespace-nowrap">
								{set.previous.weight} × {set.previous.reps}
							</td>
							<td className="py-2">
								<input
									type="number"
									value={set.current.weight}
									onChange={(e) =>
										onUpdateSet(
											planId,
											exerciseId,
											setIndex,
											"weight",
											Number(e.target.value)
										)
									}
									className="w-16 px-2 py-1 text-center border border-gray-700 rounded-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
									placeholder="0"
									min="0"
									step="0.5"
								/>
							</td>
							<td className="py-2">
								<input
									type="number"
									value={set.current.reps}
									onChange={(e) =>
										onUpdateSet(
											planId,
											exerciseId,
											setIndex,
											"reps",
											Number(e.target.value)
										)
									}
									className="w-16 px-2 py-1 text-center border border-gray-700 rounded-lg bg-white text-black focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
									placeholder="0"
									min="0"
								/>
							</td>
							<td className="py-2">
								<button
									onClick={() =>
										onDeleteSet(
											planId,
											exerciseId,
											setIndex
										)
									}
									className="p-2 text-gray-400 hover:text-red-500 transition-colors"
									aria-label="Delete set"
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
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
