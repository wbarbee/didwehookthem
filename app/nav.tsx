'use client';
import React, { useState, useEffect } from 'react';
import useFetchLonghornsSchedule from './hooks/useFetchLonghornsSchedule';
import { Oxanium } from 'next/font/google';

interface GameData {
	teamName: string;
	score: number | null;
	gameStatus: string;
	gameDate: string;
}

const oxanium = Oxanium({
	weight: '500',
	subsets: ['latin'],
});

const Nav = () => {
	const {
		data: navData,
		loading: navLoading,
		error: navError,
	} = useFetchLonghornsSchedule();
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

	if (navLoading || navError || !navData) return null;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// manully add in bowl game if not available
	if (navData.length === 13) {
		navData.push([
			{
				score: 0,
				teamName: 'TEX',
				gameStatus: 'CHAMP_GAME_SCHEDULED',
				gameDate: '1/1',
				teamInfo: '',
			},
			{
				score: 0,
				teamName: 'WU',
				gameStatus: 'CHAMP_GAME_SCHEDULED',
				gameDate: '1/1',
				teamInfo: '',
			},
		]);
	}

	const weHookedThem = (gameData: GameData[]) => {
		const texasTeam = gameData.find((team) => team.teamName === 'TEX');
		const opponentTeam = gameData.find((team) => team.teamName !== 'TEX');
		return (
			texasTeam?.score &&
			opponentTeam?.score &&
			texasTeam.score > opponentTeam.score
		);
	};

	const isNeutralTerritory = (gameData: GameData[]) => {
		return (
			['OU', 'OKST', 'WU'].includes(gameData[0].teamName) ||
			['OU', 'OKST', 'WU'].includes(gameData[1].teamName)
		);
	};

	const isGameScoreFinal = (gameData: GameData[]) => {
		return (
			gameData[0].gameStatus === 'STATUS_FINAL' ||
			gameData[0].gameStatus === 'Final'
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
					<div className='absolute -left-[1rem] md:left-1 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-md w-full z-10 pt-4 pb-3 px-1 md:px-2 mt-4 transition-all ease-in-out duration-400 max-w-[17.5rem] md:max-w-[19rem]'>
						{navData.map((gameData: GameData[], index: number) => (
							<React.Fragment key={index}>
								{gameData.length >= 2 && (
									<ul className='py-0'>
										{isGameScoreFinal(gameData) && (
											<li className={navItemStyles}>
												<span className='mr-2'>
													{weHookedThem(gameData) ? '✅' : '❌'}
												</span>
												<span className='mr-2'>[{gameData[0].gameDate}]</span>
												<span
													className={
														gameData[1].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[1].teamName} <b>{gameData[1].score}</b>
												</span>
												<span className='mx-2'>
													{isNeutralTerritory(gameData) ? 'VS.' : '@'}
												</span>
												<span
													className={
														gameData[0].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[0].teamName} <b>{gameData[0].score}</b>
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
													{gameData[0].gameStatus === 'STATUS_SCHEDULED'
														? '🗓️'
														: gameData[0].gameStatus === 'CHAMP_GAME_SCHEDULED'
														? '🏆'
														: '⏳'}
												</span>
												<span
													className={
														gameData[1].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[1].teamName}{' '}
													<b>{gameData[1].score || ''}</b>
												</span>
												<span className='mx-2'>
													{isNeutralTerritory(gameData) ? 'VS.' : '@'}
												</span>
												<span
													className={
														gameData[0].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[0].teamName}{' '}
													<b>{gameData[0].score || ''}</b>
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
