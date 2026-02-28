"use client";

import { useState, useEffect } from "react";

export default function PRCelebration({ isVisible, exercise, weight, reps, onClose }) {
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setIsAnimating(true);
			// Auto-close after 3 seconds
			const timeout = setTimeout(() => {
				handleClose();
			}, 3000);

			// Vibrate for celebration
			if ("vibrate" in navigator) {
				navigator.vibrate([100, 50, 100, 50, 200]);
			}

			return () => clearTimeout(timeout);
		}
	}, [isVisible]);

	const handleClose = () => {
		setIsAnimating(false);
		setTimeout(() => {
			onClose();
		}, 300);
	};

	if (!isVisible && !isAnimating) return null;

	return (
		<div 
			className={`fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-toast px-5 ${
				isAnimating ? "animate-fade-in" : "animate-scale-out"
			}`}
			onClick={handleClose}
		>
			<div 
				className={`glass-strong rounded-3xl w-full max-w-sm p-8 text-center border-2 border-primary shadow-glow-lg ${
					isAnimating ? "animate-scale-in" : ""
				}`}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Confetti/Star Icon */}
				<div className="relative mb-6">
					<div className="absolute inset-0 flex items-center justify-center">
						{/* Animated stars */}
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="absolute w-2 h-2 bg-primary rounded-full animate-pulse-glow"
								style={{
									transform: `rotate(${i * 45}deg) translateY(-40px)`,
									animationDelay: `${i * 0.1}s`,
								}}
							/>
						))}
					</div>
					<div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary-hover rounded-full flex items-center justify-center shadow-glow-lg animate-bounce-subtle">
						<svg
							className="w-12 h-12 text-white"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
						</svg>
					</div>
				</div>

				{/* PR Message */}
				<h2 className="text-3xl font-bold text-foreground mb-2">
					New PR! 🎉
				</h2>
				<p className="text-foreground-secondary text-lg font-semibold mb-1">
					{exercise}
				</p>
				<p className="text-2xl font-bold text-primary mb-4">
					{weight} lbs × {reps} reps
				</p>
				<p className="text-foreground-tertiary text-sm">
					You just crushed your personal record!
				</p>

				{/* Close button */}
				<button
					onClick={handleClose}
					className="mt-6 px-6 py-2 text-foreground-secondary hover:text-foreground text-sm font-semibold transition-colors duration-fast"
				>
					Continue
				</button>
			</div>
		</div>
	);
}
