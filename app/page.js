"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const success = await login({ username, password });
			if (success) {
				router.push("/dashboard");
			} else {
				setError("Invalid username or password");
			}
		} catch (error) {
			setError("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-5 safe-top safe-bottom">
			<div className="w-full max-w-md animate-fade-in">
				{/* App Logo/Icon Area */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-primary to-primary-hover rounded-2xl shadow-glow">
						<svg
							className="w-10 h-10 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
						Welcome Back
					</h1>
					<p className="text-foreground-secondary text-lg">
						Sign in to crush your goals
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-5">
					{error && (
						<div className="bg-error-bg border-2 border-error/40 text-error px-5 py-4 rounded-xl animate-scale-in flex items-start gap-3">
							<svg
								className="w-5 h-5 mt-0.5 flex-shrink-0"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="text-base font-medium">{error}</span>
						</div>
					)}

					<div className="space-y-5">
						<div>
							<label
								htmlFor="username"
								className="block text-foreground-secondary text-base font-semibold mb-2 ml-1"
							>
								Username
							</label>
							<input
								id="username"
								type="text"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-5 py-4 bg-surface text-foreground text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable"
								placeholder="Enter your username"
								autoComplete="username"
								autoCapitalize="off"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-foreground-secondary text-base font-semibold mb-2 ml-1"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-5 py-4 bg-surface text-foreground text-lg border-2 border-border rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-fast placeholder:text-foreground-tertiary min-h-touch-comfortable"
								placeholder="Enter your password"
								autoComplete="current-password"
							/>
						</div>
					</div>

					<div className="pt-2">
						<button
							type="submit"
							disabled={isLoading}
							className="w-full py-4 px-6 bg-primary text-white rounded-xl text-lg font-bold hover:bg-primary-hover active:bg-primary-active active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-fast shadow-lg min-h-touch-comfortable touch-feedback relative overflow-hidden"
						>
							{isLoading ? (
								<span className="flex items-center justify-center gap-2">
									<svg
										className="animate-spin h-5 w-5"
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
									Signing In...
								</span>
							) : (
								"Sign In"
							)}
						</button>
					</div>
				</form>

				{/* Optional: Add forgot password or sign up links */}
				<div className="mt-8 text-center">
					<p className="text-foreground-tertiary text-sm">
						Tip: Pull down to refresh your workout data
					</p>
				</div>
			</div>
		</div>
	);
}
