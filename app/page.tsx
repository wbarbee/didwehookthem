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

	const weHookedThem =
		(data.homeTeam === 'Texas Longhorns' &&
			data.homeTeamScore &&
			data.awayTeamScore &&
			parseInt(data.homeTeamScore, 10) > parseInt(data.awayTeamScore, 10)) ||
		(data.awayTeam === 'Texas Longhorns' &&
			data.awayTeamScore &&
			data.homeTeamScore &&
			parseInt(data.awayTeamScore, 10) > parseInt(data.homeTeamScore, 10));

	return (
		<section className='flex flex-col justify-center align-center w-full animate-fade-in h-screen min-h-[40rem]'>
			{data.gameStatus === 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center  pt-5 pb-8'>
					<h1
						className={`text-[13cqw] md:text-[10cqw] lg:text-[8cqw] xl:text-[7cqw] text-[#e16f1f] ${
							weHookedThem ? 'text-[#e16f1f]' : 'text-red-500'
						}`}>
						{weHookedThem ? 'Hooked Them.' : 'Did not hook them.'}
					</h1>
					<div className='mt-[3rem] mb-[4rem] w-[95%] max-w-[25rem] mx-auto'>
						<img
							src='/images/horns-1.png'
							alt='Texas Longhorns Logo'
							className={weHookedThem ? 'rotate-0' : 'rotate-180'}
						/>
					</div>
					<GameStats
						homeTeam={data.homeTeam ?? ''}
						homeTeamScore={data.homeTeamScore ?? ''}
						awayTeam={data.awayTeam ?? ''}
						awayTeamScore={data.awayTeamScore ?? ''}
						weHookedThem={weHookedThem}
						venueCity={data.venueCity ?? ''}
						venueStadium={data.venueStadium ?? ''}
					/>
				</div>
			)}
			{data.gameStatus !== 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center'>
					<h1 className='text-[9cqw] md:text-[7cqw] lg:text-[5cqw] text-[#e16f1f]'>
						Currently trying to hook...
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
