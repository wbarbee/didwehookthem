interface GameStatsProps {
	homeTeam: string;
	homeTeamScore: string;
	awayTeam: string;
	awayTeamScore: string;
	weHookedThem: boolean;
	venueCity: string;
	venueStadium: string;
}

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
		className={`game-stats bg-whiteFrost py-5 w-[90%] max-w-[22em] mx-auto text-xl font-light md:text-2xl border font-gothic rounded-sm ${
			weHookedThem
				? 'border-[#e16f1f] text-black dark:text-white'
				: 'border-red-500 text-red-500'
		}`}>
		<h2 className='text-3xl md:text-5xl font-bold tracking-wider text-gray-800'>
			{homeTeamScore} - {awayTeamScore}
		</h2>
		<h3 className='pt-3 pb-1 text-sm md:text-lg font-semibold tracking-10 text-gray-700'>
			{homeTeam} vs {awayTeam}
		</h3>
		<h3 className='text-sm md:text-lg'>
			{venueCity} @ {venueStadium}
		</h3>
	</div>
);

export default GameStats;
