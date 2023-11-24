import type { Metadata } from 'next';
import Footer from './components/Footer';
import './globals.css';

const bodyClasses = 'dark:bg-gray-950 bg-white font-graduate';

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
				{children}
				<Footer />
			</body>
		</html>
	);
}
