'use client';
import React, { useState, useEffect } from 'react';
import useFetchLonghornsSchedule from './hooks/useFetchLonghornsSchedule';
import { Oxanium } from 'next/font/google';

interface GameData {
	teamName: string;
	score: number | null;
	gameStatus: string;
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

	const weHookedThem = (gameData: GameData[]) => {
		const texasTeam = gameData.find((team) => team.teamName === 'TEX');
		const opponentTeam = gameData.find((team) => team.teamName !== 'TEX');
		return (
			texasTeam?.score &&
			opponentTeam?.score &&
			texasTeam.score > opponentTeam.score
		);
	};

	const isRedRiverRivalry = (gameData: GameData[]) => {
		return gameData[0].teamName === 'OU' || gameData[1].teamName === 'OU';
	};

	const isGameScoreFinal = (gameData: GameData[]) => {
		return gameData[0].gameStatus === 'STATUS_FINAL';
	};

	return (
		<nav className='absolute top-0 nav-main ml-3 md:ml-4 mt-4 max-w-[24rem] md:max-w-[26rem] w-full animate-fade-in'>
			<button
				onClick={toggleMenu}
				className={`px-3 py-2 material-icons bg-gray-200 hover:bg-gray-300 rounded-sm shadow-md font-gothic transition-all ease-in-out duration-400 ${
					isMenuOpen ? 'bg-gray-300' : ''
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
					<div className='caret'></div>
					<div className='absolute -left-[1rem] md:left-1 bg-gray-300 shadow-lg rounded-md w-full z-10 pt-4 pb-2 px-1 md:px-2 mt-4 transition-all ease-in-out duration-400 max-w-[17rem] md:max-w-full'>
						{navData.map((gameData: GameData[], index: number) => (
							<React.Fragment key={index}>
								{gameData.length >= 2 && (
									<ul className='py-0'>
										{isGameScoreFinal(gameData) && (
											<li
												className={`px-4 py-1 block text-black font-light mb-2 text-[11px] md:text-[14px] ${oxanium.className}`}>
												<span className='mr-2'>
													{weHookedThem(gameData) ? '✅' : '❌'}
												</span>
												<span
													className={
														gameData[1].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[1].teamName} <b>{gameData[1].score}</b>
												</span>
												<span className='mx-2'>
													{isRedRiverRivalry(gameData) ? 'vs.' : '@'}
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
													className={
														weHookedThem(gameData)
															? 'text-burntOrange'
															: 'text-red-500'
													}>
													{weHookedThem(gameData) ? 'HOOKED' : 'DID NOT HOOK'}
												</span>
											</li>
										)}
										{!isGameScoreFinal(gameData) && (
											<li
												className={`px-4 py-1 block text-black font-light mb-2 text-[11px] md:text-[14px] ${oxanium.className}`}>
												<span className='mr-3'>
													{gameData[0].gameStatus === 'STATUS_SCHEDULED'
														? '🗓️'
														: '⏳'}
												</span>
												<span
													className={
														gameData[1].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[1].teamName} <b>{gameData[1].score || 0}</b>
												</span>
												<span className='mx-2'>
													{isRedRiverRivalry(gameData) ? 'vs.' : '@'}
												</span>
												<span
													className={
														gameData[0].teamName === 'TEX'
															? 'font-bold text-burntOrange'
															: 'font-light'
													}>
													{gameData[0].teamName} <b>{gameData[0].score || 0}</b>
												</span>
												<span className='mx-2'>--</span>
												<span className='text-gray-500'>YET TO HOOK</span>
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
