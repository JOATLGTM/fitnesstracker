export default function TopBar({
	saveStatus,
	isSaving,
	onSave,
	onLogout,
	onRestClockClick,
	restTimeLeft,
	isRestTimerRunning,
}) {
	const formatTime = (seconds) => {
		const totalSeconds = Math.max(0, seconds || 0);
		const mins = Math.floor(totalSeconds / 60);
		const secs = totalSeconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	return (
		<header className="glass-strong border-b border-border fixed top-0 left-0 right-0 z-fixed safe-top animate-slide-down">
			<div className="px-5 py-4 flex justify-between items-center gap-4">
				<div className="flex-1 min-w-0 flex items-center">
					<button
						type="button"
						onClick={onRestClockClick}
						className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold min-h-touch touch-feedback relative overflow-hidden max-w-full ${
							isRestTimerRunning && restTimeLeft > 0
								? "bg-success-bg/20 border-success text-success"
								: "bg-surface border-border text-foreground-secondary hover:bg-surface-hover hover:text-foreground"
						}`}
						aria-label="Rest timer"
						title="Rest timer"
					>
						<svg
							className="w-5 h-5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.2}
								d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
							/>
						</svg>
						{restTimeLeft > 0 ? (
							<span className="text-sm font-bold tabular-nums truncate">
								{formatTime(restTimeLeft)}
							</span>
						) : (
							<span className="text-[11px] uppercase tracking-wide font-bold truncate">
								Rest
							</span>
						)}
					</button>
				</div>
				<div className="flex items-center gap-2 flex-shrink-0">
					{saveStatus && !saveStatus.includes("success") && (
						<div
							className={`px-3 py-1.5 rounded-lg text-xs font-semibold animate-scale-in ${
								saveStatus === "Saving..."
									? "bg-info-bg text-info"
									: "bg-error-bg text-error"
							}`}
						>
							<span className="flex items-center gap-1.5">
								{saveStatus === "Saving..." && (
									<svg
										className="animate-spin h-3 w-3"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										/>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										/>
									</svg>
								)}
								{saveStatus}
							</span>
						</div>
					)}
					<button
						onClick={onSave}
						disabled={isSaving}
						className={`px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold min-h-touch touch-feedback relative overflow-hidden
              ${
					isSaving
						? "opacity-50 cursor-not-allowed"
						: "hover:bg-primary-hover active:bg-primary-active active:scale-95"
				} 
              transition-all duration-fast shadow-md`}
					>
						{isSaving ? (
							<span className="flex items-center gap-1.5">
								<svg
									className="animate-spin h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									/>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									/>
								</svg>
								<span className="hidden sm:inline">Saving</span>
							</span>
						) : (
							<span className="flex items-center gap-1.5">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
									/>
								</svg>
								<span className="hidden sm:inline">Save</span>
							</span>
						)}
					</button>
					<button
						onClick={onLogout}
						className="p-2.5 text-foreground-secondary hover:text-foreground hover:bg-surface active:bg-surface-active transition-all duration-fast rounded-lg min-h-touch min-w-touch flex items-center justify-center touch-feedback relative overflow-hidden"
						aria-label="Logout"
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
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
					</button>
				</div>
			</div>
		</header>
	);
}
