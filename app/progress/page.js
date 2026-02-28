"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import {
	getTopExercises,
	getPersonalRecords,
	getTotalWorkoutStats,
	getExerciseProgressData,
} from "../utils/chartUtils";

export default function ProgressChartsPage() {
	const { user, isAuthenticated, loadWorkoutPlans } = useAuth();
	const router = useRouter();
	const [workoutPlans, setWorkoutPlans] = useState([]);
	const [selectedExercise, setSelectedExercise] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isAuthenticated) {
			router.push("/");
			return;
		}

		if (user?.id) {
			loadWorkoutPlans(user.id)
				.then((plans) => {
					if (Array.isArray(plans)) {
						setWorkoutPlans(plans);
					}
					setIsLoading(false);
				})
				.catch((error) => {
					console.error("Error loading workout plans:", error);
					setIsLoading(false);
				});
		}
	}, [user?.id, isAuthenticated]);

	if (!isAuthenticated) {
		return null;
	}

	const topExercises = getTopExercises(workoutPlans);
	const personalRecords = getPersonalRecords(workoutPlans);
	const stats = getTotalWorkoutStats(workoutPlans);
	const exerciseProgress = selectedExercise
		? getExerciseProgressData(workoutPlans, selectedExercise)
		: [];

	const COLORS = ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6"];

	return (
		<div className="min-h-screen bg-background flex flex-col safe-top safe-bottom">
			{/* Header */}
			<header className="glass-strong border-b border-border fixed top-0 left-0 right-0 z-fixed safe-top animate-slide-down">
				<div className="px-5 py-4 flex justify-between items-center">
					<div className="flex items-center gap-3">
						<button
							onClick={() => router.push("/dashboard")}
							className="p-2 text-foreground-tertiary hover:text-foreground hover:bg-surface-hover rounded-lg transition-all duration-fast min-h-touch min-w-touch flex items-center justify-center"
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
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>
						<h1 className="text-xl font-bold text-foreground">
							Progress Charts
						</h1>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<div className="flex-1 pt-[72px] px-5 py-6 overflow-y-auto momentum-scroll">
				{isLoading ? (
					<div className="text-center py-20">
						<div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
						<p className="text-foreground-secondary">Loading your progress...</p>
					</div>
				) : workoutPlans.length === 0 ? (
					<div className="text-center py-20">
						<div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center">
							<svg
								className="w-12 h-12 text-primary"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								/>
							</svg>
						</div>
						<h2 className="text-2xl font-bold text-foreground mb-3">
							No Data Yet
						</h2>
						<p className="text-foreground-secondary mb-6">
							Complete some workouts to see your progress!
						</p>
						<button
							onClick={() => router.push("/dashboard")}
							className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover active:bg-primary-active transition-all duration-fast shadow-lg"
						>
							Start Workout
						</button>
					</div>
				) : (
					<div className="space-y-6 pb-6">
						{/* Stats Cards */}
						<div className="grid grid-cols-2 gap-3">
							<div className="glass rounded-xl p-4 border border-border">
								<p className="text-foreground-tertiary text-xs font-semibold uppercase mb-1">
									Total Plans
								</p>
								<p className="text-3xl font-bold text-foreground">
									{stats.totalPlans}
								</p>
							</div>
							<div className="glass rounded-xl p-4 border border-border">
								<p className="text-foreground-tertiary text-xs font-semibold uppercase mb-1">
									Exercises
								</p>
								<p className="text-3xl font-bold text-foreground">
									{stats.totalExercises}
								</p>
							</div>
							<div className="glass rounded-xl p-4 border border-border">
								<p className="text-foreground-tertiary text-xs font-semibold uppercase mb-1">
									Total Sets
								</p>
								<p className="text-3xl font-bold text-foreground">
									{stats.totalSets}
								</p>
							</div>
							<div className="glass rounded-xl p-4 border border-border">
								<p className="text-foreground-tertiary text-xs font-semibold uppercase mb-1">
									Total Volume
								</p>
								<p className="text-2xl font-bold text-primary">
									{Math.round(stats.totalVolume).toLocaleString()} lbs
								</p>
							</div>
						</div>

						{/* Top Exercises by Volume */}
						{topExercises.length > 0 && (
							<div className="glass rounded-2xl p-5 border border-border">
								<h2 className="text-lg font-bold text-foreground mb-4">
									Top Exercises by Volume
								</h2>
								<ResponsiveContainer width="100%" height={250}>
									<BarChart data={topExercises}>
										<CartesianGrid strokeDasharray="3 3" stroke="#262626" />
										<XAxis
											dataKey="name"
											stroke="#737373"
											style={{ fontSize: "12px" }}
											angle={-45}
											textAnchor="end"
											height={80}
										/>
										<YAxis stroke="#737373" style={{ fontSize: "12px" }} />
										<Tooltip
											contentStyle={{
												backgroundColor: "#151515",
												border: "1px solid #262626",
												borderRadius: "8px",
												color: "#ffffff",
											}}
										/>
										<Bar dataKey="volume" fill="#ef4444" radius={[8, 8, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						)}

						{/* Personal Records */}
						{Object.keys(personalRecords).length > 0 && (
							<div className="glass rounded-2xl p-5 border border-border">
								<h2 className="text-lg font-bold text-foreground mb-4">
									Personal Records
								</h2>
								<div className="space-y-3">
									{Object.entries(personalRecords)
										.sort(([, a], [, b]) => b.volume - a.volume)
										.slice(0, 10)
										.map(([exercise, pr]) => (
											<div
												key={exercise}
												className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border hover:border-primary transition-colors duration-fast"
											>
												<div className="flex-1 min-w-0">
													<p className="text-foreground font-semibold truncate">
														{exercise}
													</p>
													<p className="text-foreground-tertiary text-sm">
														{pr.weight} lbs × {pr.reps} reps
													</p>
												</div>
												<div className="flex items-center gap-2 flex-shrink-0">
													<span className="text-primary font-bold">
														{Math.round(pr.volume)} lbs
													</span>
													<svg
														className="w-5 h-5 text-success"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
													</svg>
												</div>
											</div>
										))}
								</div>
							</div>
						)}

						{/* Distribution Pie Chart */}
						{topExercises.length > 0 && (
							<div className="glass rounded-2xl p-5 border border-border">
								<h2 className="text-lg font-bold text-foreground mb-4">
									Volume Distribution
								</h2>
								<ResponsiveContainer width="100%" height={250}>
									<PieChart>
										<Pie
											data={topExercises}
											cx="50%"
											cy="50%"
											labelLine={false}
											label={({ name, percent }) =>
												`${name}: ${(percent * 100).toFixed(0)}%`
											}
											outerRadius={80}
											fill="#8884d8"
											dataKey="volume"
										>
											{topExercises.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip
											contentStyle={{
												backgroundColor: "#151515",
												border: "1px solid #262626",
												borderRadius: "8px",
												color: "#ffffff",
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
