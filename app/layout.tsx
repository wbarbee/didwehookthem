import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const bodyClasses = 'dark:bg-gray-950 bg-white font-playfair';

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
			<body className={`${inter.className} ${bodyClasses}`}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
