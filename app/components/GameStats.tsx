import { Orbitron } from 'next/font/google';
import { GameStatsProps } from '../types';
import React from 'react';

const orbitron = Orbitron({
	weight: '500',
	subsets: ['latin'],
});

const GameStats: React.FC<GameStatsProps> = ({
	gameData,
	teamData,
	backupNextGameInfo,
}) => {
	return (
		<>
			{backupNextGameInfo ? (
				<div
					className={`game-stats relative bg-whiteFrost dark:bg-gray-900 py-5 w-[90%] max-w-[22rem] md:max-w-[28rem] mx-auto text-xl md:text-2xl border font-light rounded-md ${
						!gameData.weHookedThem && gameData.gameStatus === 'Final'
							? 'border-red-500 text-red-500'
							: 'border-burntOrange text-black dark:text-white'
					}`}>
					{gameData.team1Score === 0 && gameData.team2Score === 0 && (
						<h2
							className={`scoreboard font-bold text-3xl md:text-4xl font-oxanium tracking-wider dark:text-gray-400 text-gray-800 pb-1 md:pb-3  ${orbitron.className}`}>
							{gameData.team1Score} - {gameData.team2Score}
						</h2>
					)}
					<h3 className='pb-1 text-sm md:text-lg font-semibold tracking-10 font-gothic dark:text-gray-400 text-gray-700'>
						{gameData.team1Name} {gameData.neutralSite ? 'vs.' : '@'}{' '}
						{gameData.team2Name}
					</h3>
					<h3 className='text-sm md:text-lg dark:text-gray-400 font-gothic text-gray-700'>
						<b>{gameData.venueStadium}</b> [{gameData.venueCity},{' '}
						{gameData.venueState}]
					</h3>
					<h3 className='text-sm md:text-lg dark:text-gray-400 font-gothic text-gray-700'>
						<b>{gameData.gameDate}</b>
					</h3>
				</div>
			) : (
				<div
					className={`game-stats relative bg-whiteFrost dark:bg-gray-900 py-5 w-[90%] max-w-[22rem] md:max-w-[28rem] mx-auto text-xl md:text-2xl border font-light rounded-md`}>
					<h2
						className={`scoreboard font-bold text-3xl md:text-4xl font-oxanium tracking-wider dark:text-gray-400 text-gray-800 pt-0 mt-0 pb-1 md:pb-3  ${orbitron.className}`}>
						{teamData?.standingSummary}
					</h2>
					<h2
						className={`scoreboard font-light text-2xl md:text-3xl font-oxanium tracking-wider dark:text-gray-400 text-gray-800 pb-1 md:pb-3`}>
						<b>Final Ranking</b>: {teamData?.rank}
					</h2>
					<h2
						className={`scoreboard font-light text-2xl md:text-3xl font-oxanium tracking-wider dark:text-gray-400 text-gray-800 pb-0`}>
						<b>W</b>: {teamData?.wins} <b>L</b>: {teamData?.losses}
					</h2>
				</div>
			)}
		</>
	);
};

export default GameStats;
