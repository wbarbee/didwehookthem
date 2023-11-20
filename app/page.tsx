'use client';
import useFetchCollegeFootballData from './hooks/useFetchCollegeFootballData';
import GameStats from './components/GameStats';

const Home = () => {
	const { data, loading, error } = useFetchCollegeFootballData();

	if (loading)
		return (
			<div className='-mt-[2rem] md:mt-0 mb-2rem md:mb-0 flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
				<h1 className='text-[6cqw] md:text-[4cqw] lg:text-[3cqw] text-[#e16f1f] text-center'>
					Did We Hook Them? Calculating...
				</h1>
				<span className='loader'></span>
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

	const handleRefreshClick = () => {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	};

	const weHookedThem =
		(data.homeTeam === 'Texas Longhorns' &&
			Number(data.homeTeamScore) > Number(data.awayTeamScore)) ||
		(data.awayTeam === 'Texas Longhorns' &&
			Number(data.awayTeamScore) > Number(data.homeTeamScore));

	return (
		<section className='flex flex-col justify-center align-center w-full animate-fade-in h-screen min-h-[45rem] py-8 relative'>
			{data.gameStatus === 'Final' && (
				<div className='-mt-[2rem] md:mt-0 mb-2rem md:mb-0 max-w-[55rem] w-[95%] mx-auto text-center pt-5 pb-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-sm relative'>
					<h1
						className={`text-[12cqw] md:text-[10cqw] lg:text-[8cqw] xl:text-[5cqw] text-[#e16f1f] ${
							weHookedThem ? 'text-[#e16f1f]' : 'text-red-500'
						}`}>
						{weHookedThem ? 'We hooked them.' : 'Did not hook them.'}
					</h1>
					<div className='mt-[3rem] mb-[4rem] w-[95%] max-w-[18rem] md:max-w-[25rem] mx-auto'>
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
				<div className='-mt-[2rem] md:mt-0 mb-2rem md:mb-0 max-w-[55rem] w-full mx-auto text-center'>
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
			<p className='fixed w-[95%] max-w-[5.5rem] bottom-2 right-0'>
				<button
					className='font-gothic font-xs opacity-50 hover:opacity-100 transition-all ease-in-out duration-300 dark:bg-whiteFrost hover:bg-blackFrost dark:text-white px-2 py-1 text-black rounded-sm'
					onClick={handleRefreshClick}>
					<span className='text-xs'>Refresh</span>
					<img
						className='w-[0.75rem] inline-block ml-2 align-middle mt-0'
						src='/images/refresh.svg'
						alt='refresh icon'
					/>
				</button>
			</p>
		</section>
	);
};

export default Home;
