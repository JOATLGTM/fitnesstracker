import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
	title: "Fitness Tracker - Get Those Gains",
	description: "Track your workouts, log your sets, and crush your fitness goals",
	applicationName: "Fitness Tracker",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Fitness Tracker",
	},
	formatDetection: {
		telephone: false,
	},
	manifest: "/manifest.json",
};

export const viewport = {
	themeColor: "#000000",
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	viewportFit: "cover",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body className={inter.className}>
				<AuthContextProvider>{children}</AuthContextProvider>
			</body>
		</html>
	);
}
