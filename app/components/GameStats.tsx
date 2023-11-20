import { GameStatsProps } from '../types';

const GameStats: React.FC<GameStatsProps> = ({
	homeTeam,
	homeTeamScore,
	awayTeam,
	awayTeamScore,
	weHookedThem,
	venueCity,
	venueStadium,
}) => (
	<div
		className={`game-stats relative bg-whiteFrost dark:bg-gray-900 py-5 w-[90%] max-w-[28rem] mx-auto text-xl font-light md:text-2xl border font-gothic rounded-sm ${
			weHookedThem
				? 'border-burntOrange text-black dark:text-white'
				: 'border-red-500 text-red-500'
		}`}>
		<h2 className='text-3xl md:text-5xl font-bold tracking-wider dark:text-gray-400 text-gray-800'>
			{awayTeamScore} - {homeTeamScore}
		</h2>
		<h3 className='pt-1 md:pt-3 pb-1 text-sm md:text-lg font-semibold tracking-10 dark:text-gray-400 text-gray-700'>
			{awayTeam} @ {homeTeam}
		</h3>
		<h3 className='text-sm md:text-lg dark:text-gray-400 text-gray-700'>
			<b>{venueStadium}</b> [{venueCity}]
		</h3>
	</div>
);

export default GameStats;
