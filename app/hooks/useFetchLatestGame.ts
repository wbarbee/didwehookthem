import { useCallback } from 'react';
import useFetchData from './useFetchData';
import constants from '../utils/constants';
import { createFormattedGameDataFromEvent } from '../utils/createFormattedGameDataFromEvent';
import { FormattedGameData, ScheduledEvent } from '../types';

const endpoint = constants.apiFetchSingleGameEndpoint;

const isTexasLonghornsGame = (event: ScheduledEvent): boolean => {
	return event.competitions.some((competition: any) =>
		competition.competitors.some((competitor: any) =>
			competitor.team?.displayName?.includes('Texas Longhorns')
		)
	);
};

const useFetchLatestGame = () => {
	const processData = useCallback((json: any) => {
		const events = json.events;
		const nextChanceToHookThem = events.filter(isTexasLonghornsGame);
		return nextChanceToHookThem.length > 0
			? createFormattedGameDataFromEvent(nextChanceToHookThem[0])
			: null;
	}, []);

	return useFetchData(endpoint, processData);
};

export default useFetchLatestGame;

function fetchUpcomingGameData(
	events: ScheduledEvent[]
): FormattedGameData | null {
	const nextEvent = events
		.filter((event) =>
			event.competitions.some((competition: any) =>
				competition.competitors.some((competitor: any) =>
					competitor.team?.displayName?.includes('Texas Longhorns')
				)
			)
		)
		.shift();

	return nextEvent ? createFormattedGameDataFromEvent(nextEvent) : null;
}
