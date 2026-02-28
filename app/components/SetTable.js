export default function SetTable({
	sets,
	planId,
	exerciseId,
	onUpdateSet,
	onDeleteSet,
}) {
	return (
		<div className="overflow-x-auto -mx-1 px-1">
			<table className="w-full min-w-full">
				<thead>
					<tr className="text-foreground-secondary text-sm font-bold border-b-2 border-border">
						<th className="text-left py-3 px-2 w-[12%]">#</th>
						<th className="text-left py-3 px-2 w-[28%]">Previous</th>
						<th className="text-left py-3 px-2 w-[23%]">lbs</th>
						<th className="text-left py-3 px-2 w-[23%]">Reps</th>
						<th className="text-center py-3 px-2 w-[14%]"></th>
					</tr>
				</thead>
				<tbody>
					{sets.map((set, setIndex) => (
						<tr 
							key={setIndex} 
							className="border-b border-border hover:bg-surface/50 transition-colors duration-fast"
						>
							<td className="py-3 px-2">
								<span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface text-foreground-secondary font-bold text-sm">
									{setIndex + 1}
								</span>
							</td>
							<td className="py-3 px-2">
								<span className="text-foreground-tertiary font-semibold text-sm whitespace-nowrap">
									{set.previous.weight || 0} × {set.previous.reps || 0}
								</span>
							</td>
							<td className="py-3 px-2">
								<input
									type="number"
									inputMode="decimal"
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
									className="w-full max-w-[70px] px-3 py-2.5 text-center text-base font-bold border-2 border-border rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch"
									placeholder="0"
									min="0"
									step="0.5"
								/>
							</td>
							<td className="py-3 px-2">
								<input
									type="number"
									inputMode="numeric"
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
									className="w-full max-w-[70px] px-3 py-2.5 text-center text-base font-bold border-2 border-border rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch"
									placeholder="0"
									min="0"
								/>
							</td>
							<td className="py-3 px-2 text-center">
								<button
									onClick={() =>
										onDeleteSet(
											planId,
											exerciseId,
											setIndex
										)
									}
									className="inline-flex items-center justify-center p-2 text-foreground-tertiary hover:text-error hover:bg-error-bg transition-all duration-fast rounded-lg min-h-touch min-w-touch touch-feedback relative overflow-hidden"
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
											strokeWidth={2.5}
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
