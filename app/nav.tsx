'use client';
import React, { useState } from 'react';
import useFetchLonghornsSchedule from './hooks/useFetchLonghornsSchedule';
import { Oxanium } from 'next/font/google';

interface GameData {
	teamName: string;
	score: number | null;
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

	if (navLoading || navError || !navData) return null;

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const weHookedThem = (gameData: GameData[]) => {
		const texasTeam = gameData.find(
			(team) => team.teamName === 'Texas Longhorns'
		);
		const opponentTeam = gameData.find(
			(team) => team.teamName !== 'Texas Longhorns'
		);
		return (
			texasTeam?.score &&
			opponentTeam?.score &&
			texasTeam.score > opponentTeam.score
		);
	};

	return (
		<nav className='relative nav-main ml-4 mt-4 max-w-[23.5rem] md:max-w-[26rem] animate-fade-in'>
			<button
				onClick={toggleMenu}
				className='px-3 py-2 material-icons bg-gray-200 hover:bg-gray-300 rounded-sm shadow-md font-gothic transition-all ease-in-out duration-400'>
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
				<div className='dropdown-wrapper relative ml-4'>
					<div className='caret left-[10px] md:left-[20px]'></div>
					<div className='absolute -left-[1rem] md:left-2 bg-gray-200 shadow-lg rounded-md w-full z-10 pt-4 pb-2 px-2 mt-4 transition-all ease-in-out duration-400'>
						{navData.map((gameData: GameData[], index: number) => (
							<React.Fragment key={index}>
								{gameData.length >= 2 && (
									<ul className='py-0'>
										<li
											className={`px-4 py-1 block text-black font-light mb-2 text-[12px] md:text-[14px] ${oxanium.className}`}>
											<span className='mr-2'>
												{weHookedThem(gameData) ? '✅' : '❌'}
											</span>
											<span
												className={
													gameData[1].teamName === 'Texas Longhorns'
														? 'font-bold text-orange-500'
														: 'font-light'
												}>
												{gameData[1].teamName} {gameData[1].score}
											</span>
											<span className='mx-2'>@</span>
											<span
												className={
													gameData[0].teamName === 'Texas Longhorns'
														? 'font-bold text-orange-500'
														: 'font-light'
												}>
												{gameData[0].teamName} {gameData[0].score}
											</span>
										</li>
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