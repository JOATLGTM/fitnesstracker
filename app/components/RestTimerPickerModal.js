"use client";

import { useEffect, useState } from "react";

const PRESETS = [30, 60, 90, 120, 180];

function formatPresetLabel(sec) {
	if (sec < 60) return `${sec}s`;
	return `${sec / 60}m`;
}

export default function RestTimerPickerModal({
	isOpen,
	onClose,
	defaultSeconds,
	isRunning,
	onStartRest,
	onStopRest,
}) {
	const [secondsStr, setSecondsStr] = useState(String(defaultSeconds ?? 90));

	useEffect(() => {
		if (isOpen) {
			setSecondsStr(String(defaultSeconds ?? 90));
		}
	}, [isOpen, defaultSeconds]);

	if (!isOpen) return null;

	const parsed = parseInt(secondsStr, 10);
	const safeSeconds = Number.isNaN(parsed)
		? 90
		: Math.max(1, Math.min(3600, parsed));

	const handleStart = () => {
		onStartRest(safeSeconds);
	};

	return (
		<div
			className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-modal px-0 sm:px-5 animate-fade-in"
			onClick={onClose}
			role="presentation"
		>
			<div
				className="glass-strong rounded-t-3xl sm:rounded-2xl w-full max-w-md border-t-2 sm:border-2 border-border shadow-2xl animate-slide-up sm:animate-scale-in safe-bottom"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="px-6 py-5 border-b border-border">
					<h3 className="text-xl font-bold text-foreground">Rest timer</h3>
					<p className="text-sm text-foreground-secondary mt-1">
						Choose duration, then start. Starting again resets the countdown.
					</p>
				</div>

				<div className="px-6 py-5 space-y-5">
					<div className="flex flex-wrap gap-2">
						{PRESETS.map((s) => (
							<button
								key={s}
								type="button"
								onClick={() => setSecondsStr(String(s))}
								className={`px-4 py-2.5 rounded-xl text-sm font-bold min-h-touch touch-feedback transition-all duration-fast ${
									safeSeconds === s
										? "bg-primary text-white shadow-glow"
										: "bg-surface text-foreground-secondary border border-border hover:bg-surface-hover"
								}`}
							>
								{formatPresetLabel(s)}
							</button>
						))}
					</div>

					<div>
						<label
							htmlFor="rest-custom-seconds"
							className="block text-xs font-semibold text-foreground-secondary mb-2 uppercase tracking-wide"
						>
							Custom (seconds)
						</label>
						<input
							id="rest-custom-seconds"
							type="number"
							inputMode="numeric"
							min={1}
							max={3600}
							value={secondsStr}
							onChange={(e) => setSecondsStr(e.target.value)}
							className="w-full px-4 py-3 rounded-xl border-2 border-border bg-surface text-foreground text-lg font-bold focus:border-primary focus:ring-4 focus:ring-primary/20 focus:outline-none min-h-touch"
						/>
					</div>

					{isRunning && onStopRest && (
						<button
							type="button"
							onClick={() => {
								onStopRest();
								onClose();
							}}
							className="w-full py-3.5 rounded-xl text-base font-bold border-2 border-border bg-surface text-foreground-secondary hover:bg-surface-hover active:bg-surface-active transition-all duration-fast min-h-touch touch-feedback"
						>
							Stop timer
						</button>
					)}

					<button
						type="button"
						onClick={handleStart}
						className="w-full py-4 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-hover active:bg-primary-active shadow-md transition-all duration-fast min-h-touch-comfortable touch-feedback"
					>
						Start rest
					</button>

					<button
						type="button"
						onClick={onClose}
						className="w-full py-3 text-foreground-tertiary font-semibold text-sm hover:text-foreground transition-colors"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
