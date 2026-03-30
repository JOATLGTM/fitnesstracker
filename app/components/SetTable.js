export default function SetTable({
	sets,
	planId,
	exerciseId,
	onUpdateSet,
	onDeleteSet,
}) {
	const checkIfPR = (set, setIndex) => {
		if (!set.current.weight || !set.current.reps) return false;

		const currentVolume = set.current.weight * set.current.reps;
		const previousVolume = set.previous.weight * set.previous.reps;

		const isWeightPR =
			set.current.weight > set.previous.weight &&
			set.current.reps >= set.previous.reps;
		const isRepPR =
			set.current.weight === set.previous.weight &&
			set.current.reps > set.previous.reps;
		const isVolumePR =
			currentVolume > previousVolume && currentVolume > 0 && previousVolume > 0;

		return isWeightPR || isRepPR || isVolumePR;
	};

	return (
		<div className="overflow-x-hidden -mx-1 px-1">
			<table className="w-full min-w-full" style={{ tableLayout: "fixed" }}>
				<thead>
					<tr className="text-foreground-secondary text-sm font-bold border-b-2 border-border">
						<th className="text-center py-3 px-1 w-[7%]">#</th>
						<th className="text-center py-3 px-0.5 w-[20%]">Prev</th>
						<th className="text-left py-3 px-2 w-[30%]">lbs</th>
						<th className="text-left py-3 px-2 w-[25%]">Reps</th>
						<th className="text-center py-3 px-0.5 w-[6%]"></th>
					</tr>
				</thead>
				<tbody>
					{sets.map((set, setIndex) => {
						const isPR = checkIfPR(set, setIndex);
						return (
							<tr 
								key={setIndex} 
								className={`border-b border-border hover:bg-surface/50 transition-colors duration-fast ${
									isPR ? "bg-success-bg/30" : ""
								}`}
							>
								<td className="py-3 px-1 text-center">
									<span className="inline-flex items-center justify-center rounded-md font-bold text-xs bg-surface text-foreground-secondary" style={{ width: '1rem', height: '1rem' }}>
										{setIndex + 1}
									</span>
								</td>
								<td className="py-3 px-0.5 overflow-hidden">
									<div className="flex flex-col items-center justify-center">
										<span className="text-foreground-tertiary font-semibold text-[10px] leading-tight truncate max-w-full">
											{set.previous.weight || 0}×{set.previous.reps || 0}
										</span>
										{isPR && (
											<svg
												className="w-2 h-2 text-success mt-0.5"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
											</svg>
										)}
									</div>
								</td>
								<td className="py-3 px-2">
									<input
										type="number"
										inputMode="decimal"
										value={
											set.current.weight === 0
												? ""
												: set.current.weight
										}
										onChange={(e) =>
											onUpdateSet(
												planId,
												exerciseId,
												setIndex,
												"weight",
												e.target.value
											)
										}
										className={`w-full px-3 py-3 text-center text-lg font-bold border-2 rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch ${
											isPR ? "border-success" : "border-border"
										}`}
										placeholder="0"
										min="0"
										step="0.01"
									/>
								</td>
								<td className="py-3 px-2">
									<input
										type="number"
										inputMode="numeric"
										value={
											set.current.reps === 0
												? ""
												: set.current.reps
										}
										onChange={(e) =>
											onUpdateSet(
												planId,
												exerciseId,
												setIndex,
												"reps",
												e.target.value === ""
													? ""
													: parseInt(
															e.target.value,
															10
													  )
											)
										}
										className={`w-full px-3 py-3 text-center text-lg font-bold border-2 rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch ${
											isPR ? "border-success" : "border-border"
										}`}
										placeholder="0"
										min="0"
										step="1"
									/>
								</td>
								<td className="py-3 px-1 text-center">
									<button
										onClick={() =>
											onDeleteSet(
												planId,
												exerciseId,
												setIndex
											)
										}
										className="inline-flex items-center justify-center p-1 text-foreground-tertiary hover:text-error hover:bg-error-bg transition-all duration-fast rounded-lg min-h-touch touch-feedback relative overflow-hidden"
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
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
