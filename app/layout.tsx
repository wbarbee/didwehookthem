import type { Metadata } from 'next';
import Footer from './components/Footer';
import './globals.css';
import Nav from './nav';
import { Analytics } from '@vercel/analytics/react';

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
				<Nav />
				<div className='min-h-screen'>{children}</div>
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
