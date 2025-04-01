import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Fitness Tracker",
	description: "Track your workouts and achieve your fitness goals",
	viewport:
		"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
	themeColor: "#4F46E5", // Indigo color for mobile browser theme
	appleWebAppCapable: "yes",
	appleWebAppStatusBarStyle: "black-translucent",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
				<meta name="theme-color" content="#4F46E5" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body className={`${inter.className} overscroll-none`}>
				<AuthContextProvider>{children}</AuthContextProvider>
			</body>
		</html>
	);
}
