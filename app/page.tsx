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
	if (error)
		return (
			<div className='flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
				<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-[#e16f1f] text-center'>
					An error occurred while trying to fetch the data. Please try again
					later.
				</h1>
			</div>
		);

	if (!data) return null;

	console.log(data);

	const gameData = {
		gameStatus: data.status.type.shortDetail,
		homeTeam: data.competitions[0].competitors[0].team.displayName,
		homeTeamScore: parseInt(data.competitions[0].competitors[0].score, 10),
		awayTeam: data.competitions[0].competitors[1].team.displayName,
		awayTeamScore: parseInt(data.competitions[0].competitors[1].score, 10),
		venueCity: `${data.competitions[0].venue.address.city}, ${data.competitions[0].venue.address.state}`,
		venueStadium: data.competitions[0].venue.fullName,
	};

	const weHookedThem =
		(gameData.homeTeam === 'Texas Longhorns' &&
			gameData.homeTeamScore > gameData.awayTeamScore) ||
		(gameData.awayTeam === 'Texas Longhorns' &&
			gameData.awayTeamScore > gameData.homeTeamScore);

	return (
		<section className='flex flex-col justify-center align-center w-full animate-fade-in h-screen min-h-[40rem]'>
			{gameData.gameStatus === 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center  pt-5 pb-8'>
					<h1
						className={`text-[13cqw] md:text-[10cqw] lg:text-[8cqw] xl:text-[7cqw] text-[#e16f1f] ${
							weHookedThem ? 'text-[#e16f1f]' : 'text-red-500'
						}`}>
						{weHookedThem ? 'Hooked Them' : 'Did Not Hook Them'}
					</h1>
					<div className='mt-[3rem] mb-[4rem] w-[95%] max-w-[25rem] mx-auto'>
						<img
							src='/images/horns-1.png'
							alt='Texas Longhorns Logo'
							className={weHookedThem ? 'rotate-0' : 'rotate-180'}
						/>
					</div>
					<GameStats
						homeTeam={gameData.homeTeam}
						homeTeamScore={gameData.homeTeamScore}
						awayTeam={gameData.awayTeam}
						awayTeamScore={gameData.awayTeamScore}
						weHookedThem={weHookedThem}
						venueCity={gameData.venueCity}
						venueStadium={gameData.venueStadium}
					/>
				</div>
			)}
			{gameData.gameStatus !== 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center'>
					<h1 className='text-[9cqw] md:text-[7cqw] lg:text-[5cqw] text-[#e16f1f]'>
						Currently Trying to Hook
					</h1>
					<div className='mt-[3.5rem] mb-[4rem] w-[95%] max-w-[25rem] mx-auto'>
						<img
							src='/images/horns-1.png'
							alt='Texas Longhorns Logo'
							className={weHookedThem ? 'rotate-0' : 'rotate-180'}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default Home;
