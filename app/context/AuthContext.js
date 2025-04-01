"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { auth, database, authenticateUser } from "../firebase";
import { ref, onValue, set } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Listen to auth state changes
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				// Extract username from email (e.g., user1@fitnesstracker.com -> user1)
				const username = firebaseUser.email.split("@")[0];
				setUser({
					id: firebaseUser.uid,
					username: username,
				});
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const login = async (credentials) => {
		try {
			const firebaseUser = await authenticateUser(credentials.username);
			return true;
		} catch (error) {
			console.error("Login error:", error);
			return false;
		}
	};

	const logout = async () => {
		try {
			await signOut(auth);
			setUser(null);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	// Firebase database helpers
	const saveWorkoutPlans = async (userId, workoutPlans) => {
		if (!userId || !Array.isArray(workoutPlans)) {
			console.error("Invalid userId or workoutPlans format");
			return false;
		}

		try {
			const userPlansRef = ref(database, `workoutPlans/${userId}`);
			await set(userPlansRef, workoutPlans);
			return true;
		} catch (error) {
			console.error("Error saving workout plans:", error);
			return false;
		}
	};

	const loadWorkoutPlans = async (userId) => {
		if (!userId) {
			console.error("Invalid userId");
			return [];
		}

		return new Promise((resolve, reject) => {
			const userPlansRef = ref(database, `workoutPlans/${userId}`);
			onValue(
				userPlansRef,
				(snapshot) => {
					const data = snapshot.val();
					resolve(Array.isArray(data) ? data : []);
				},
				(error) => {
					console.error("Error loading workout plans:", error);
					reject(error);
				},
				{ onlyOnce: true }
			);
		});
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				login,
				logout,
				saveWorkoutPlans,
				loadWorkoutPlans,
			}}
		>
			{!loading && children}
		</AuthContext.Provider>
	);
};
