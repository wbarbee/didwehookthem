import React from 'react';
import Footer from './components/Footer';
import Nav from './nav';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import NextEventSlider from './components/NextEventSlider';

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
				<div className='min-h-screen'>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
