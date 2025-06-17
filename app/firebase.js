// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDxyJHM_JYRaYpiSqf6uqqbtuXC7_sGbig",
	authDomain: "fitnesstracker-943cc.firebaseapp.com",
	databaseURL: "https://fitnesstracker-943cc-default-rtdb.firebaseio.com",
	projectId: "fitnesstracker-943cc",
	storageBucket: "fitnesstracker-943cc.firebasestorage.app",
	messagingSenderId: "405429668187",
	appId: "1:405429668187:web:7d6ca5607611f014f5f27e",
};

// Initialize Firebase
let firebaseApp;

if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
}

// Initialize Firebase services
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

// Custom authentication function
const authenticateUser = async (username) => {
	// Map usernames to their corresponding Firebase Authentication emails and passwords
	const userMap = {
		whoskawaii: {
			email: process.env.NEXT_PUBLIC_USER1_EMAIL,
			password: process.env.NEXT_PUBLIC_USER1_PASSWORD,
		},
		rvijay0204: {
			email: process.env.NEXT_PUBLIC_USER2_EMAIL,
			password: process.env.NEXT_PUBLIC_USER2_PASSWORD,
		},
		lazobas: {
			email: process.env.NEXT_PUBLIC_USER3_EMAIL,
			password: process.env.NEXT_PUBLIC_USER3_PASSWORD,
		},
		duyle813219: {
			email: process.env.NEXT_PUBLIC_USER4_EMAIL,
			password: process.env.NEXT_PUBLIC_USER4_PASSWORD,
		},
		marcosjuarez: {
			email: process.env.NEXT_PUBLIC_USER4_EMAIL,
			password: process.env.NEXT_PUBLIC_USER4_PASSWORD,
		},
	};

	if (!userMap[username]?.email || !userMap[username]?.password) {
		throw new Error("Invalid username or missing configuration");
	}

	try {
		// Sign in with Firebase Authentication using the specific user's credentials
		const userCredential = await signInWithEmailAndPassword(
			auth,
			userMap[username].email,
			userMap[username].password
		);
		return userCredential.user;
	} catch (error) {
		console.error("Authentication error:", error);
		throw error;
	}
};

export { firebaseApp, auth, database, authenticateUser };
