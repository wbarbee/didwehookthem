'use client';
import useFetchLonghornsSchedule from '../hooks/useFetchLonghornsSchedule';
import { Oxanium } from 'next/font/google';
import { FormattedGameData } from '../types';

const oxanium = Oxanium({
	weight: '500',
	subsets: ['latin'],
});

const NextEventSlider = () => {
	const { data } = useFetchLonghornsSchedule();

	const today = new Date();

	const upcomingGameData: FormattedGameData | undefined = data
		?.filter((game) => game.gameStatus === 'STATUS_FINAL')
		.filter((game) => new Date(game.gameDate) > today)
		.sort(
			(a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime()
		)[0];

	if (!upcomingGameData) {
		return null;
	} else {
		return (
			<div className='next-event-slider-wrapper absolute md:fixed right-3 top-3 md:top-auto md:right-auto md:left-3 md:bottom-3 bg-blue-900 dark:bg-gray-900 px-0 pt-0 pb-3 text-xs md:text-sm rounded-md text-white font-gothic font-light text-center animate-slide-in-right md:animate-slide-in-left delay-300 z-10'>
				<h2
					className={`font-semibold underline dark:bg-gray-800 text-white dark:text-burntOrange w-full mx-auto dark:mb-2 pt-2 dark:pt-1 pb-1 px-0 mt-0 rounded-t-md text-xs ${oxanium.className}`}>
					UP NEXT:
				</h2>
				<div className='px-4'>
					<h2 className='font-semibold'>
						{upcomingGameData?.team2Name}{' '}
						{upcomingGameData?.neutralSite ? 'vs.' : '@'}{' '}
						{upcomingGameData?.team1Name}
					</h2>
					<h3>{upcomingGameData?.gameDate}</h3>
					<h3>
						{upcomingGameData?.venueStadium} [{upcomingGameData?.venueCity},{' '}
						{upcomingGameData?.venueState}]
					</h3>
				</div>
			</div>
		);
	}
};

export default NextEventSlider;
