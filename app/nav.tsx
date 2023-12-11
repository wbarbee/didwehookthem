'use client';
import React, { useState, useEffect } from 'react';
import { FormattedGameData } from './types';
import { Oxanium } from 'next/font/google';
import useFetchLonghornsSchedule from './hooks/useFetchLonghornsSchedule';
import weHookedThem from './utils/weHookedThem';

const oxanium = Oxanium({
	weight: '500',
	subsets: ['latin'],
});

const Nav = () => {
	const { data, loading, error } = useFetchLonghornsSchedule();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleOutsideClick = (event: any) => {
			if (isMenuOpen && !event.target.closest('.nav-main')) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener('click', handleOutsideClick);
		}

		return () => {
			document.removeEventListener('click', handleOutsideClick);
		};
	}, [isMenuOpen]);

	if (loading || error || !data) return null;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isGameScoreFinal = (gameData: FormattedGameData) => {
		return (
			gameData.gameStatus === 'STATUS_FINAL' ||
			gameData.gameStatus === 'Final' ||
			gameData.gameStatus === 'CHAMP_FINAL'
		);
	};

	const navItemStyles = `px-4 pb-1 block text-black font-light mb-2 text-[12px] md:text-[14px] ${oxanium.className} dark:text-gray-300`;

	return (
		<nav className='absolute top-0 nav-main ml-3 md:ml-4 mt-4 max-w-[21rem] md:max-w-[27rem] w-full animate-fade-in'>
			<button
				onClick={toggleMenu}
				className={`px-3 py-2 material-icons bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:border-burntOrange dark:border-solid dark:border-[1px] dark:hover:bg-gray-800 rounded-sm shadow-md font-gothic transition-all ease-in-out duration-400 ${
					isMenuOpen ? 'bg-gray-300 dark:bg-gray-800' : ''
				}`}>
				<img
					src='images/horns-1.png'
					className='w-[30px] h-auto inline-block'
					alt='menu icon'
				/>{' '}
				<span className='font-semibold text-xl align-middle mt-[5px] text-burntOrange ml-1'>
					?
				</span>
			</button>

			{isMenuOpen && (
				<div className='dropdown-wrapper relative ml-4 max-w-[95%] md:max-w-[19.5rem] w-full'>
					<div className='caret border-color-[#d1d5dc]'></div>
					<div className='absolute -left-[1rem] md:left-1 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-md w-full z-10 pt-3 pb-1 px-1 md:px-2 mt-4 transition-all ease-in-out duration-400 max-w-[18rem] md:max-w-[19.5rem]'>
						{data.map((gameData: FormattedGameData, index: number) => (
							<React.Fragment key={index}>
								{gameData && (
									<ul className='py-0'>
										{isGameScoreFinal(gameData) && (
											<li className={navItemStyles}>
												<span className='mr-2'>
													{weHookedThem(gameData)
														? gameData.gameHeadline &&
														  (gameData.gameHeadline.includes('Playoffs') ||
																gameData.gameHeadline.includes('Championship'))
															? '🏆'
															: '✅'
														: '❌'}
												</span>
												<span className='mr-2'>
													[{gameData.formattedGameDate}]
												</span>
												<span
													className={
														gameData.team2Name === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData.team2Name} <b>{gameData.team2Score}</b>
												</span>
												<span className='mx-2'>
													{gameData.neutralSite ? 'VS.' : '@'}
												</span>
												<span
													className={
														gameData.team1Name === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData.team1Name} <b>{gameData.team1Score}</b>
												</span>
												<span className='mx-2'>--</span>
												<span
													className={`text-xl w-4 align-middle ${
														weHookedThem(gameData)
															? 'text-burntOrange'
															: 'text-red-500'
													}`}>
													{weHookedThem(gameData) ? (
														'🤘'
													) : (
														<div className='rotate-180 w-4 ml-1 inline-block'>
															🤘
														</div>
													)}
												</span>
											</li>
										)}
										{!isGameScoreFinal(gameData) && (
											<li className={navItemStyles}>
												<span className='mr-3'>
													{gameData.gameStatus === 'STATUS_SCHEDULED'
														? '🗓️'
														: gameData.gameHeadline.includes('Championship')
														? '🏆'
														: '⏳'}
												</span>
												<span
													className={
														gameData.team2Name === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData.team2Name}{' '}
													<b>{gameData.team2Score || ''}</b>
												</span>
												<span className='mx-2'>
													{gameData.neutralSite ? 'VS.' : '@'}
												</span>
												<span
													className={
														gameData.team1Name === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData.team1Name}{' '}
													<b>{gameData.team1Score || ''}</b>
												</span>
												<span className='mx-2'>--</span>
												<span className='text-gray-500 dark:text-gray-400'>
													YET TO HOOK
												</span>
											</li>
										)}
									</ul>
								)}
							</React.Fragment>
						))}
					</div>
				</div>
			)}
		</nav>
	);
};

export default Nav;
