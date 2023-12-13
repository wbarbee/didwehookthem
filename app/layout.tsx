import React from 'react';
import Footer from './components/Footer';
import NextEventSlider from './components/NextEventSlider';
import { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import ScoreSlider from './components/ScoreSlider';

const bodyClasses =
	'dark:bg-gray-950 bg-white font-graduate w-full h-full min-h-screen ';

export const metadata: Metadata = {
	title: 'Did we hook them?',
	description: 'A great source to find out if we hooked them or not.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<body className={`${bodyClasses}`}>
				<ScoreSlider />
				<NextEventSlider />
				<Analytics />
				<SpeedInsights />
				<div className='min-h-screen'>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
