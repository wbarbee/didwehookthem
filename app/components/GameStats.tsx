import { Orbitron } from 'next/font/google';
import { GameStatsProps } from '../types';

const orbitron = Orbitron({
	weight: '500',
	subsets: ['latin'],
});

const GameStats: React.FC<GameStatsProps> = ({
	homeTeam,
	homeTeamScore,
	awayTeam,
	gameStatus,
	awayTeamScore,
	weHookedThem,
	venueCity,
	venueStadium,
}) => (
	<div
		className={`game-stats relative bg-whiteFrost dark:bg-gray-900 py-5 w-[90%] max-w-[22rem] md:max-w-[28rem] mx-auto text-xl md:text-2xl border font-light rounded-sm ${
			!weHookedThem && gameStatus === 'Final'
				? 'border-red-500 text-red-500'
				: 'border-burntOrange text-black dark:text-white'
		}`}>
		<h2
			className={`scoreboard font-bold text-3xl md:text-4xl font-oxanium tracking-wider dark:text-gray-400 text-gray-800 ${orbitron.className}`}>
			{awayTeamScore} - {homeTeamScore}
		</h2>
		<h3 className='pt-1 md:pt-3 pb-1 text-sm md:text-lg font-semibold tracking-10 font-gothic dark:text-gray-400 text-gray-700'>
			{awayTeam} @ {homeTeam}
		</h3>
		<h3 className='text-sm md:text-lg dark:text-gray-400 font-gothic text-gray-700'>
			<b>{venueStadium}</b> [{venueCity}]
		</h3>
	</div>
);

export default GameStats;
