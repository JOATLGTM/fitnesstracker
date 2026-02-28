"use client";

import { useState, useEffect, useRef } from "react";

export default function RestTimer({ isVisible, onClose, defaultDuration = 90 }) {
	const [timeLeft, setTimeLeft] = useState(defaultDuration);
	const [isRunning, setIsRunning] = useState(false);
	const [customDuration, setCustomDuration] = useState(defaultDuration);
	const [isEditing, setIsEditing] = useState(false);
	const intervalRef = useRef(null);

	useEffect(() => {
		if (isVisible && !isRunning) {
			setTimeLeft(defaultDuration);
			setCustomDuration(defaultDuration);
		}
	}, [isVisible, defaultDuration]);

	useEffect(() => {
		if (isRunning && timeLeft > 0) {
			intervalRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						setIsRunning(false);
						playCompletionSound();
						vibrateDevice();
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isRunning, timeLeft]);

	const playCompletionSound = () => {
		// Play a sound when timer completes (using Web Audio API)
		try {
			const audioContext = new (window.AudioContext || window.webkitAudioContext)();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();

			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);

			oscillator.frequency.value = 800;
			oscillator.type = "sine";

			gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 0.5);
		} catch (error) {
			console.log("Audio not supported");
		}
	};

	const vibrateDevice = () => {
		if ("vibrate" in navigator) {
			navigator.vibrate([200, 100, 200, 100, 200]);
		}
	};

	const handleStart = () => {
		setIsRunning(true);
	};

	const handlePause = () => {
		setIsRunning(false);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTimeLeft(customDuration);
	};

	const handleAdd15 = () => {
		setTimeLeft((prev) => prev + 15);
	};

	const handleCustomDuration = (seconds) => {
		setCustomDuration(seconds);
		setTimeLeft(seconds);
		setIsRunning(false);
		setIsEditing(false);
	};

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const getProgressPercentage = () => {
		return ((customDuration - timeLeft) / customDuration) * 100;
	};

	const getTimerColor = () => {
		const percentage = (timeLeft / customDuration) * 100;
		if (percentage <= 10) return "text-error";
		if (percentage <= 30) return "text-warning";
		return "text-primary";
	};

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-modal px-5 animate-fade-in">
			<div className="w-full max-w-sm">
				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-8 right-8 p-3 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover rounded-xl transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center safe-top"
					aria-label="Close timer"
				>
					<svg
						className="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2.5}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Timer Display */}
				<div className="text-center mb-12">
					<p className="text-foreground-secondary text-lg font-semibold mb-4">
						Rest Timer
					</p>
					
					{/* Circular Progress */}
					<div className="relative w-64 h-64 mx-auto mb-8">
						{/* Background circle */}
						<svg className="w-full h-full transform -rotate-90">
							<circle
								cx="128"
								cy="128"
								r="112"
								stroke="currentColor"
								strokeWidth="12"
								fill="none"
								className="text-surface"
							/>
							{/* Progress circle */}
							<circle
								cx="128"
								cy="128"
								r="112"
								stroke="currentColor"
								strokeWidth="12"
								fill="none"
								className={`${getTimerColor()} transition-all duration-1000`}
								strokeDasharray={`${2 * Math.PI * 112}`}
								strokeDashoffset={`${2 * Math.PI * 112 * (1 - getProgressPercentage() / 100)}`}
								strokeLinecap="round"
							/>
						</svg>
						
						{/* Time display */}
						<div className="absolute inset-0 flex flex-col items-center justify-center">
							<span className={`text-7xl font-bold ${getTimerColor()} transition-colors duration-300`}>
								{formatTime(timeLeft)}
							</span>
							<span className="text-foreground-tertiary text-sm font-medium mt-2">
								{timeLeft === 0 ? "Time's up!" : "remaining"}
							</span>
						</div>
					</div>

					{/* Quick time presets */}
					{!isRunning && !isEditing && (
						<div className="flex gap-2 justify-center mb-6">
							{[30, 60, 90, 120, 180].map((seconds) => (
								<button
									key={seconds}
									onClick={() => handleCustomDuration(seconds)}
									className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-fast min-h-touch ${
										customDuration === seconds
											? "bg-primary text-white"
											: "bg-surface text-foreground-secondary hover:bg-surface-hover"
									}`}
								>
									{seconds < 60 ? `${seconds}s` : `${seconds / 60}m`}
								</button>
							))}
						</div>
					)}
				</div>

				{/* Control Buttons */}
				<div className="space-y-3">
					{!isRunning ? (
						<button
							onClick={handleStart}
							disabled={timeLeft === 0}
							className="w-full py-4 bg-primary text-white rounded-xl text-xl font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-fast shadow-glow min-h-touch-comfortable touch-feedback relative overflow-hidden flex items-center justify-center gap-3"
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M8 5v14l11-7z" />
							</svg>
							<span>Start Rest</span>
						</button>
					) : (
						<button
							onClick={handlePause}
							className="w-full py-4 bg-warning text-white rounded-xl text-xl font-bold hover:bg-warning/90 active:scale-[0.98] transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden flex items-center justify-center gap-3"
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
							</svg>
							<span>Pause</span>
						</button>
					)}

					<div className="flex gap-3">
						<button
							onClick={handleReset}
							className="flex-1 py-3 bg-surface text-foreground border-2 border-border rounded-xl text-base font-bold hover:bg-surface-hover active:bg-surface-active transition-all duration-fast min-h-touch flex items-center justify-center gap-2"
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
									d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								/>
							</svg>
							<span>Reset</span>
						</button>
						<button
							onClick={handleAdd15}
							className="flex-1 py-3 bg-surface text-foreground border-2 border-border rounded-xl text-base font-bold hover:bg-surface-hover active:bg-surface-active transition-all duration-fast min-h-touch flex items-center justify-center gap-2"
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
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								/>
							</svg>
							<span>+15s</span>
						</button>
					</div>

					<button
						onClick={onClose}
						className="w-full py-3 text-foreground-tertiary hover:text-foreground text-base font-bold transition-colors duration-fast"
					>
						Skip Rest
					</button>
				</div>
			</div>
		</div>
	);
}
