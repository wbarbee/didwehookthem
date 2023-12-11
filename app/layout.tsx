import React from 'react';
import Footer from './components/Footer';
import Nav from './nav';
import NextEventSlider from './components/NextEventSlider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const bodyClasses =
	'dark:bg-gray-950 bg-white font-graduate w-full h-full min-h-screen ';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${bodyClasses}`}>
				<NextEventSlider />
				<Nav />
				<Analytics />
				<SpeedInsights />
				<div className='min-h-screen'>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
