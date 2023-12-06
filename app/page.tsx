'use client';
import useFetchCurrentGameData from './hooks/useFetchCurrentGameData';
import GameStats from './components/GameStats';
import Loading from './components/Loading';
import ErrorMsg from './components/ErrorMsg';
import NextEventSlider from './components/NextEventSlider';

const Home = () => {
	const { data, loading, error } = useFetchCurrentGameData();

	if (loading) return <Loading />;

	if (error) return <ErrorMsg />;

	if (!data) return null;

	const handleRefreshClick = () => {
		if (typeof window !== 'undefined') {
			window.location.reload();
		}
	};

	const refreshSrc =
		'https://ik.imagekit.io/mefqellzto/misc/refresh_7D_Gnmjk3.svg?updatedAt=1700495470983';
	const darkRefreshSrc =
		'https://ik.imagekit.io/mefqellzto/misc/refresh-dark-mode_9GNAmZqHg.png?updatedAt=1700511360761';

	const weHookedThem =
		(data.gameStatus === 'Final' &&
			data.homeTeam === 'Texas Longhorns' &&
			Number(data.homeTeamScore) >= Number(data.awayTeamScore)) ||
		(data.awayTeam === 'Texas Longhorns' &&
			Number(data.awayTeamScore) >= Number(data.homeTeamScore));

	return (
		<section className='flex flex-col justify-center align-center w-full h-screen min-h-[45rem] py-4 relative font-graduate md:-mt-[0.5rem]'>
			<NextEventSlider nextGameData={data.teamInfo?.nextEvent[0] || ''} />
			{data.gameStatus === 'Final' && (
				<div className='-mt-[2rem] md:mt-0 mb-2rem md:mb-0 max-w-[45rem] w-[95%] mx-auto text-center pt-5 pb-8 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-sm relative animate-fade-in'>
					<h1
						className={`text-[2.75rem] md:text-[4rem] text-burntOrange ${
							weHookedThem ? 'text-burntOrange' : 'text-red-500'
						}`}>
						{weHookedThem ? 'We hooked them.' : 'Did not hook them.'}
					</h1>
					<div
						className={`mt-[1rem] mb-[2.5rem] w-[95%] max-w-[18rem] md:max-w-[20rem] mx-auto animate-fade-in ${
							weHookedThem ? 'rotate-0' : 'rotate-180'
						}`}>
						<span className='text-7xl'>🤘</span>
					</div>
					<GameStats
						homeTeam={data.homeTeam ?? ''}
						homeTeamScore={data.homeTeamScore ?? ''}
						awayTeam={data.awayTeam ?? ''}
						gameStatus={data.gameStatus ?? ''}
						awayTeamScore={data.awayTeamScore ?? ''}
						weHookedThem={weHookedThem}
						venueCity={data.venueCity ?? ''}
						venueStadium={data.venueStadium ?? ''}
					/>
				</div>
			)}
			{data.gameStatus !== 'Final' && (
				<div className='-mt-[2rem] md:mt-0 mb-2rem md:mb-0 max-w-[55rem] w-[95%] mx-auto text-center pt-5 pb-8 bg-gray-200 dark:bg-gray-900 rounded-lg shadow-sm relative animate-fade-in'>
					<h1 className='text-[6.5cqw] md:text-[3rem] lg:text-[3.25rem] text-burntOrange font-graduate leading-[2.2rem] md:leading-[3.4rem]'>
						{data.gameStatus === 'Scheduled' ? (
							<>
								Game Day: <br />
								Will we hook them?
							</>
						) : (
							'Currently trying to hook them.'
						)}
					</h1>
					<div className='mt-[1rem] mb-[2rem] md:mt-[2rem] md:mb-[2.5rem] w-[95%] max-w-[15rem] mx-auto animate-pulse-opacity'>
						<span className='text-7xl'>🤘</span>
					</div>
					<GameStats
						homeTeam={data.homeTeam ?? ''}
						homeTeamScore={data.homeTeamScore ?? ''}
						awayTeam={data.awayTeam ?? ''}
						gameStatus={data.gameStatus ?? ''}
						awayTeamScore={data.awayTeamScore ?? ''}
						weHookedThem={weHookedThem}
						venueCity={data.venueCity ?? ''}
						venueStadium={data.venueStadium ?? ''}
					/>
				</div>
			)}
			<p className='fixed w-[95%] max-w-[5.5rem] bottom-3 right-2'>
				<button
					className='font-gothic font-xs opacity-50 dark:opacity-70 hover:opacity-100 transition-all ease-in-out duration-300 dark:bg-gray-600 dark:hover:bg-gray-500 hover:bg-blackFrost dark:text-white px-3 pt-1 pb-[5px] text-black rounded-sm'
					onClick={handleRefreshClick}>
					<span className='text-xs'>Refresh</span>
					<picture className='inline-block w-[0.85rem] ml-2 align-middle'>
						<source
							srcSet={darkRefreshSrc}
							media='(prefers-color-scheme: dark)'
						/>
						<img src={refreshSrc} alt='Refresh Icon' />
					</picture>
				</button>
			</p>
		</section>
	);
};

export default Home;
