import { useCallback } from 'react';
import useFetchData from './useFetchData';
import { ScheduledEvent, FormattedGameData } from '../types';
import { createFormattedGameDataFromEvent } from '../utils/createFormattedGameDataFromEvent';
import constants from '../utils/constants';

const useFetchCurrentGameData = () => {
	const processData = useCallback((json: any): FormattedGameData[] => {
		const events = json.events;
		return events ? formatGameData(events) : [];
	}, []);

	return useFetchData(constants.apiFetchFullScheduleEndpoint, processData);
};

export default useFetchCurrentGameData;

function formatGameData(events: ScheduledEvent[]): FormattedGameData[] {
	return events.map(createFormattedGameDataFromEvent);
}
