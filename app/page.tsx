'use client';
import useFetchCollegeFootballData from './hooks/useFetchCollegeFootballData';
import GameStats from './components/GameStats';

const Home = () => {
	const { data, loading, error } = useFetchCollegeFootballData();

	if (loading)
		return (
			<div className='flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
				<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-[#e16f1f] text-center'>
					Did We Hook Them? Calculating...
				</h1>
			</div>
		);
	if (error) return 'An error occurred';

	if (!data) return null;

	const gameData = {
		gameStatus: data.status.type.shortDetail,
		homeTeam: data.competitions[0].competitors[0].team.displayName,
		homeTeamScore: parseInt(data.competitions[0].competitors[0].score, 10),
		awayTeam: data.competitions[0].competitors[1].team.displayName,
		awayTeamScore: parseInt(data.competitions[0].competitors[1].score, 10),
	};

	const weHookedThem =
		(gameData.homeTeam === 'Texas Longhorns' &&
			gameData.homeTeamScore > gameData.awayTeamScore) ||
		(gameData.awayTeam === 'Texas Longhorns' &&
			gameData.awayTeamScore > gameData.homeTeamScore);

	return (
		<section className='flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
			{gameData.gameStatus === 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center'>
					<h1 className='text-[13cqw] md:text-[10cqw] lg:text-[7cqw] text-[#e16f1f]'>
						{weHookedThem ? 'Hooked Them' : 'Did Not Hook Them'}
					</h1>
					{weHookedThem && (
						<div className='md:-mt-[5rem] md:-mb-[4rem]'>
							<img src='/images/horns.png' alt='Texas Longhorns Logo' />
						</div>
					)}
					<GameStats
						homeTeam={gameData.homeTeam}
						homeTeamScore={gameData.homeTeamScore}
						awayTeam={gameData.awayTeam}
						awayTeamScore={gameData.awayTeamScore}
						weHookedThem={weHookedThem}
					/>
				</div>
			)}
			{gameData.gameStatus !== 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center'>
					<h1 className='text-[9cqw] md:text-[7cqw] lg:text-[5cqw] text-[#e16f1f]'>
						Currently Trying to Hook
					</h1>
				</div>
			)}
		</section>
	);
};

export default Home;
