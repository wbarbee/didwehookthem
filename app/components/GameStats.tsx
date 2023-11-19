interface GameStatsProps {
	homeTeam: string;
	homeTeamScore: number;
	awayTeam: string;
	awayTeamScore: number;
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
		className={`game-stats py-8 w-[90%] max-w-[25em] mx-auto text-xl font-light md:text-2xl bg-[rbga(255,255,255,0.8)] border ${
			weHookedThem
				? 'border-[#e16f1f] text-white'
				: 'border-red-500 text-red-500'
		}`}>
		<h2 className='text-6xl font-bold tracking-wider'>
			{homeTeamScore} - {awayTeamScore}
		</h2>
		<h3 className='pt-5 pb-2'>
			{homeTeam} vs {awayTeam}
		</h3>
		<h3 className='text-lg'>
			{venueCity} -- {venueStadium}
		</h3>
	</div>
);

export default GameStats;
