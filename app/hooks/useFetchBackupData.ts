import { useCallback } from 'react';
import useFetchData from './useFetchData';
import { createFormattedGameDataFromEvent } from '../utils/createFormattedGameDataFromEvent';
import constants from '../utils/constants';

const useFetchBackupData = () => {
	const processData = useCallback((json: any) => {
		const nextChanceToHookThem = json.team.nextEvent[0];
		return nextChanceToHookThem
			? createFormattedGameDataFromEvent(nextChanceToHookThem)
			: null;
	}, []);

	return useFetchData(constants.apiFetchBackupInfo, processData);
};

export default useFetchBackupData;
