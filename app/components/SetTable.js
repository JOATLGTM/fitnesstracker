export default function SetTable({
	sets,
	planId,
	exerciseId,
	onUpdateSet,
	onToggleSetCompletion,
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
										onToggleSetCompletion(
											planId,
											exerciseId,
											setIndex
										)
									}
									className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
										set.completed
											? "bg-green-500 hover:bg-green-600"
											: "bg-gray-700 hover:bg-gray-600"
									}`}
								>
									<svg
										className="w-5 h-5 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
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
