interface GameStatsProps {
	homeTeam: string;
	homeTeamScore: number;
	awayTeam: string;
	awayTeamScore: number;
	weHookedThem: boolean;
}

const GameStats: React.FC<GameStatsProps> = ({
	homeTeam,
	homeTeamScore,
	awayTeam,
	awayTeamScore,
	weHookedThem,
}) => (
	<div
		className={`game-stats py-8 w-[90%] max-w-[25em] mx-auto text-xl md:text-2xl bg-[rbga(255,255,255,0.8)] border ${
			weHookedThem
				? 'border-[#e16f1f] text-white'
				: 'border-red-500 text-red-500'
		}`}>
		<h3>
			{homeTeam} vs {awayTeam}
		</h3>
		<h2 className='text-6xl mt-6'>
			{homeTeamScore} - {awayTeamScore}
		</h2>
	</div>
);

export default GameStats;
