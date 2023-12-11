'use client';
import React from 'react';
import Footer from './components/Footer';
import Nav from './nav';
import useFetchLonghornsSchedule from './hooks/useFetchLonghornsSchedule';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import Home from './page';
import { FormattedGameData } from './types';

const bodyClasses =
	'dark:bg-gray-950 bg-white font-graduate w-full h-full min-h-screen ';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data, loading, error } = useFetchLonghornsSchedule();

	return (
		<html lang='en'>
			<body className={`${bodyClasses}`}>
				<Nav
					data={data as unknown as FormattedGameData[]}
					loading={loading}
					error={error}
				/>
				<Analytics />
				<div className='min-h-screen'>
					<Home
						data={data as unknown as FormattedGameData[]}
						loading={loading}
						error={error}
					/>
				</div>
				<Footer />
			</body>
		</html>
	);
}
