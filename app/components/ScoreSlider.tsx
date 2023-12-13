'use client';
import React, { useState } from 'react';
import useFetchLonghornsSchedule from '../hooks/useFetchLonghornsSchedule';
import weHookedThem from '../utils/weHookedThem';

const ScoreSlider = () => {
	const { data, loading, error } = useFetchLonghornsSchedule();
	const [isOpen, setIsOpen] = useState(false);

	if (loading || !data || error) return null;

	const toggleSlider = () => {
		setIsOpen(!isOpen);
	};

	const notYet = (game: any) => {
		return game.team1Score === '0' && game.team2Score === '0';
	};

	return isOpen ? (
		<div
			className={`h-full min-h-[100vh] w-[95%] md:max-w-[25rem] bg-gray-900 z-[100] px-3 overflow-auto animate-slide-in-left-no-fade fixed py-14 text-white font-gothic font-light md:mt-2 ${
				isOpen ? 'open' : 'closed'
			}`}>
			<button
				className='absolute top-2 right-3 text-2xl hover:opacity-80 opacity-100 transform-all ease-in-out duration-300 hover:text-burntOrange'
				onClick={toggleSlider}>
				&#x2715;
			</button>
			{data.map((game: any, index) => (
				<div
					key={index}
					className='flex justify-between items-center border-burntOrange border p-4 rounded-sm border-l-4'>
					<div>
						<h3>{game.gameDate}</h3>
						<h3 className='font-bold leading-8'>
							{game.team1Name} {game.neutralSite ? 'vs.' : '@'} {game.team2Name}
							<span className='mx-2'></span> [{game.team1Score} -{' '}
							{game.team2Score}]
						</h3>
					</div>
					<h4 className='text-3xl text-burntOrange font-bold'>
						{notYet(game) ? '🤘?' : weHookedThem(game) ? '🤘' : '❌'}
					</h4>
				</div>
			))}
		</div>
	) : (
		<div className='fixed top-3 left-3 z-[100]'>
			<button
				className='text-3xl text-burntOrange font-gothic font-semibold hover:opacity-80 opacity-100 transform-all ease-in-out duration-300'
				onClick={toggleSlider}>
				🤘?
			</button>
		</div>
	);
};

export default ScoreSlider;
