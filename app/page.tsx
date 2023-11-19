'use client';
import useFetchCollegeFootballData from './hooks/useFetchCollegeFootballData';

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

	const homeTeam = data.competitions[0].competitors[0].team.displayName;
	const homeTeamScore = parseInt(data.competitions[0].competitors[0].score, 10);
	const awayTeam = data.competitions[0].competitors[1].team.displayName;
	const awayTeamScore = parseInt(data.competitions[0].competitors[1].score, 10);
	const gameStatus = data.status.type.shortDetail;

	const weHookedThem =
		(homeTeam === 'Texas Longhorns' && homeTeamScore > awayTeamScore) ||
		(awayTeam === 'Texas Longhorns' && awayTeamScore > homeTeamScore);

	return (
		<section className='flex flex-col justify-center align-center w-full h-screen animate-fade-in'>
			{gameStatus === 'Final' && (
				<div className='max-w-[55rem] w-full mx-auto text-center'>
					<h1 className='text-[13cqw] md:text-[10cqw] lg:text-[7cqw] text-[#e16f1f]'>
						{weHookedThem ? 'Hooked Them' : 'Did Not Hook Them'}
					</h1>
					{weHookedThem && (
						<div className='md:-mt-[5rem] md:-mb-[4rem]'>
							<img src='/images/horns.png' alt='Texas Longhorns Logo' />
						</div>
					)}
					<div
						className={`game-stats py-8 w-[90%] max-w-[25em] mx-auto  text-xl md:text-2xl bg-[rbga(255,255,255,0.8)] ${
							weHookedThem
								? 'border border-[#e16f1f] dark:text-white text-black'
								: 'border border-red-500 text-red-500'
						}`}>
						<h3>
							{homeTeam} vs {awayTeam}
						</h3>
						<h2 className='text-6xl mt-6'>
							{homeTeamScore} - {awayTeamScore}
						</h2>
					</div>
				</div>
			)}
		</section>
	);
};

export default Home;
