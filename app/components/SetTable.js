export default function SetTable({
	sets,
	planId,
	exerciseId,
	onUpdateSet,
	onDeleteSet,
	onSetComplete,
}) {
	const checkIfPR = (set, setIndex) => {
		if (!set.current.weight || !set.current.reps) return false;
		
		const currentVolume = set.current.weight * set.current.reps;
		const previousVolume = set.previous.weight * set.previous.reps;
		
		// Check if current weight is higher at same or more reps
		const isWeightPR = set.current.weight > set.previous.weight && set.current.reps >= set.previous.reps;
		// Check if same weight but more reps
		const isRepPR = set.current.weight === set.previous.weight && set.current.reps > set.previous.reps;
		// Check if total volume increased
		const isVolumePR = currentVolume > previousVolume && currentVolume > 0 && previousVolume > 0;
		
		return isWeightPR || isRepPR || isVolumePR;
	};

	const handleSetComplete = (setIndex) => {
		const set = sets[setIndex];
		const isPR = checkIfPR(set, setIndex);
		if (onSetComplete) {
			onSetComplete(setIndex, isPR, set);
		}
	};

	return (
		<div className="overflow-x-auto -mx-1 px-1">
			<table className="w-full min-w-full">
				<thead>
					<tr className="text-foreground-secondary text-sm font-bold border-b-2 border-border">
						<th className="text-left py-3 px-2 w-[10%]">#</th>
						<th className="text-left py-3 px-2 w-[24%]">Previous</th>
						<th className="text-left py-3 px-2 w-[20%]">lbs</th>
						<th className="text-left py-3 px-2 w-[20%]">Reps</th>
						<th className="text-center py-3 px-2 w-[14%]"></th>
						<th className="text-center py-3 px-2 w-[12%]"></th>
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
								<td className="py-3 px-2">
									<span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
										isPR ? "bg-success text-white" : "bg-surface text-foreground-secondary"
									}`}>
										{setIndex + 1}
									</span>
								</td>
								<td className="py-3 px-2">
									<div className="flex items-center gap-1">
										<span className="text-foreground-tertiary font-semibold text-sm whitespace-nowrap">
											{set.previous.weight || 0} × {set.previous.reps || 0}
										</span>
										{isPR && (
											<svg
												className="w-4 h-4 text-success flex-shrink-0"
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
										className={`w-full max-w-[70px] px-3 py-2.5 text-center text-base font-bold border-2 rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch ${
											isPR ? "border-success" : "border-border"
										}`}
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
										className={`w-full max-w-[70px] px-3 py-2.5 text-center text-base font-bold border-2 rounded-lg bg-surface text-foreground focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast min-h-touch ${
											isPR ? "border-success" : "border-border"
										}`}
										placeholder="0"
										min="0"
									/>
								</td>
								<td className="py-3 px-2 text-center">
									<button
										onClick={() => handleSetComplete(setIndex)}
										disabled={!set.current.weight || !set.current.reps}
										className="inline-flex items-center justify-center p-2 text-foreground-tertiary hover:text-success hover:bg-success-bg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-fast rounded-lg min-h-touch min-w-touch touch-feedback relative overflow-hidden"
										aria-label="Complete set"
										title="Complete set & start rest timer"
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
												d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</button>
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
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
