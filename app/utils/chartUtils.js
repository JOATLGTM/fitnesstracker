// Utility functions for processing workout data for charts

export const calculateVolumePerWorkout = (workoutPlans) => {
	const volumeData = [];
	
	workoutPlans.forEach((plan) => {
		plan.exercises?.forEach((exercise) => {
			exercise.sets?.forEach((set) => {
				const volume = set.previous.weight * set.previous.reps;
				if (volume > 0) {
					volumeData.push({
						exercise: exercise.name,
						volume,
						planName: plan.name,
					});
				}
			});
		});
	});
	
	return volumeData;
};

export const getExerciseProgressData = (workoutPlans, exerciseName) => {
	const progressData = [];
	
	// In a real app, you'd track historical data with timestamps
	// For now, we'll use the previous values as historical data points
	workoutPlans.forEach((plan) => {
		plan.exercises?.forEach((exercise) => {
			if (exercise.name === exerciseName) {
				exercise.sets?.forEach((set, index) => {
					if (set.previous.weight && set.previous.reps) {
						progressData.push({
							set: `Set ${index + 1}`,
							weight: set.previous.weight,
							reps: set.previous.reps,
							volume: set.previous.weight * set.previous.reps,
						});
					}
				});
			}
		});
	});
	
	return progressData;
};

export const getTopExercises = (workoutPlans, limit = 5) => {
	const exerciseVolumes = {};
	
	workoutPlans.forEach((plan) => {
		plan.exercises?.forEach((exercise) => {
			const totalVolume = exercise.sets?.reduce((sum, set) => {
				return sum + (set.previous.weight * set.previous.reps);
			}, 0) || 0;
			
			if (exerciseVolumes[exercise.name]) {
				exerciseVolumes[exercise.name] += totalVolume;
			} else {
				exerciseVolumes[exercise.name] = totalVolume;
			}
		});
	});
	
	return Object.entries(exerciseVolumes)
		.map(([name, volume]) => ({ name, volume }))
		.sort((a, b) => b.volume - a.volume)
		.slice(0, limit);
};

export const getPersonalRecords = (workoutPlans) => {
	const prs = {};
	
	workoutPlans.forEach((plan) => {
		plan.exercises?.forEach((exercise) => {
			let maxWeight = 0;
			let maxVolume = 0;
			let bestSet = null;
			
			exercise.sets?.forEach((set) => {
				const volume = set.previous.weight * set.previous.reps;
				
				if (set.previous.weight > maxWeight || volume > maxVolume) {
					maxWeight = Math.max(maxWeight, set.previous.weight);
					maxVolume = Math.max(maxVolume, volume);
					bestSet = set.previous;
				}
			});
			
			if (bestSet && bestSet.weight > 0) {
				prs[exercise.name] = {
					weight: maxWeight,
					reps: bestSet.reps,
					volume: maxVolume,
				};
			}
		});
	});
	
	return prs;
};

export const getTotalWorkoutStats = (workoutPlans) => {
	let totalExercises = 0;
	let totalSets = 0;
	let totalVolume = 0;
	
	workoutPlans.forEach((plan) => {
		totalExercises += plan.exercises?.length || 0;
		
		plan.exercises?.forEach((exercise) => {
			totalSets += exercise.sets?.length || 0;
			
			exercise.sets?.forEach((set) => {
				totalVolume += set.previous.weight * set.previous.reps;
			});
		});
	});
	
	return {
		totalPlans: workoutPlans.length,
		totalExercises,
		totalSets,
		totalVolume,
	};
};
