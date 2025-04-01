"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const success = await login({ username, password });
			if (success) {
				router.push("/dashboard");
			} else {
				setError("Invalid username or password");
			}
		} catch (error) {
			setError("An error occurred during login");
		}
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center px-4">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-4xl font-bold text-white mb-2">
						Welcome Back
					</h1>
					<p className="text-gray-400">
						Sign in to access your workout plans
					</p>
				</div>

				<form onSubmit={handleSubmit} className="mt-8 space-y-6">
					{error && (
						<div className="bg-red-950/50 border border-red-800 text-red-200 px-4 py-3 rounded-lg">
							{error}
						</div>
					)}

					<div className="space-y-4">
						<div>
							<label
								htmlFor="username"
								className="text-gray-300 text-sm font-medium"
							>
								Username
							</label>
							<input
								id="username"
								type="text"
								required
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="mt-1 w-full px-4 py-3 bg-white text-black border border-gray-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
								placeholder="Enter your username"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="text-gray-300 text-sm font-medium"
							>
								Password
							</label>
							<input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="mt-1 w-full px-4 py-3 bg-white text-black border border-gray-700 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-shadow"
								placeholder="Enter your password"
							/>
						</div>
					</div>

					<button
						type="submit"
						className="w-full py-3 px-4 bg-red-600 text-white rounded-xl text-lg font-medium hover:bg-red-700 active:bg-red-800 transition-colors"
					>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
}
