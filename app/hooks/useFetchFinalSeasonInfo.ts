import { useCallback } from 'react';
import constants from '../utils/constants';
import useFetchData from './useFetchData';

const endpoint = constants.apiFetchBackupInfo;

interface Stats {
	wins?: number;
	losses?: number;
}

const useFetchFinalSeasonInfo = () => {
	const processData = useCallback((json: any) => {
		const team = json.team;
		const recordItems = team.record.items;

		const stats = recordItems[0].stats.reduce(
			(acc: Stats, stat: { name: string; value: number }) => {
				if (stat.name === 'wins' || stat.name === 'losses') {
					acc[stat.name] = stat.value;
				}
				return acc;
			},
			{}
		);

		return {
			standingSummary: team.standingSummary,
			rank: team.rank,
			wins: stats.wins,
			losses: stats.losses,
		};
	}, []);

	return useFetchData(endpoint, processData);
};

export default useFetchFinalSeasonInfo;
