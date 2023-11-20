import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
			<body
				className={`${
					inter.className
				} ${'dark:bg-gray-950 bg-white font-playfair'}`}>
				{children}
				<footer className='font-gothic font-xs text-gray-400 text-center py-3'>
					© {new Date().getFullYear()} Will Barbee. All rights reserved.
				</footer>
			</body>
		</html>
	);
}
