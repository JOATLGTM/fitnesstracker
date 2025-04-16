import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "CV's Fitness Tracker",
	description: "Track your workouts and progress",
};

export const viewport = {
	themeColor: "#000000",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContextProvider>{children}</AuthContextProvider>
			</body>
		</html>
	);
}
