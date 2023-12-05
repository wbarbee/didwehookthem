import { Oxanium } from 'next/font/google';

export interface INextEventSliderProps {
	nextGameData: {
		date: string;
		shortName: string;
		competitions: any;
	};
}

const oxanium = Oxanium({
	weight: '500',
	subsets: ['latin'],
});

const NextEventSlider: React.FC<INextEventSliderProps> = ({ nextGameData }) => {
	if (!nextGameData) {
		return null;
	} else {
		return (
			<div className='next-event-slider-wrapper fixed left-2 selection:md:left-3 bottom-3 bg-blue-900 dark:bg-blue-900 px-0 pt-0 pb-4 text-xs md:text-sm rounded-md text-white font-gothic font-light text-center animate-slide-in-left delay-300'>
				<h2
					className={`font-semibold bg-white dark:bg-gray-900 text-blue-900 dark:text-burntOrange w-full mx-auto mb-2 pt-1 pb-1 px-0 mt-0 rounded-t-md text-xs ${oxanium.className}`}>
					UP NEXT:
				</h2>
				<div className='px-4'>
					<h2 className='font-semibold'>{nextGameData.shortName}</h2>
					<h2>
						{nextGameData.competitions[0].type.text} [
						{nextGameData.competitions[0].status.type.shortDetail}]
					</h2>
					<h3>
						{nextGameData.competitions[0].venue.fullName} [
						{nextGameData.competitions[0].venue.address.city},{' '}
						{nextGameData.competitions[0].venue.address.state}]
					</h3>
				</div>
			</div>
		);
	}
};

export default NextEventSlider;
