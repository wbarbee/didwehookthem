import { useEffect, useState } from 'react';
import { Game, FormattedGameData } from '../types';

const scoreboardEndpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';
const teamEndpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/texas';

const useFetchCurrentGameData = () => {
	const [formattedData, setFormattedData] = useState<FormattedGameData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const [refetchIndex, setRefetchIndex] = useState(0);

	const refetch = () => {
		setRefetchIndex((prevIndex) => prevIndex + 1);
	};

	useEffect(() => {
		setLoading(true);
		setError(null);
		const abortController = new AbortController();
		const { signal } = abortController;

		const fetchScoreboard = async (startDate: string, endDate: string) => {
			const response = await fetch(
				`${scoreboardEndpoint}?dates=${startDate}-${endDate}&limit=500`,
				{
					method: 'GET',
					cache: 'no-cache',
					signal,
				}
			);
			if (!response.ok) {
				console.error('SCORE Error status:', response.status);
				const errorResponse = await response.text();
				console.error('SCORE Error details:', errorResponse);
				throw new Error(`SCORE Server error: ${response.status}`);
			}
			return response.json();
		};

		const fetchTeam = async () => {
			const response = await fetch(teamEndpoint, {
				method: 'GET',
				cache: 'no-cache',
				signal,
			});
			if (!response.ok) {
				console.error('TEAM Error status:', response.status);
				const errorResponse = await response.text();
				console.error('TEAM Error details:', errorResponse);
				throw new Error(`TEAM Server error: ${response.status}`);
			}
			return response.json();
		};

		const tryFetchData = async (startDate: string, endDate: string) => {
			try {
				const jsonScoreboard = await fetchScoreboard(startDate, endDate);
				console.log('Raw Scoreboard Data:', jsonScoreboard); // Debugging

				if (jsonScoreboard.events.length === 0) {
					console.warn('No events found in the data');
					return false;
				}

				const jsonTeam = await fetchTeam();

				const longhornsData = extractTexasLonghornsData(jsonScoreboard);
				if (longhornsData) {
					const combinedData = formatGameData(longhornsData);
					combinedData.teamInfo = jsonTeam.team;
					setFormattedData(combinedData);
				} else {
					console.warn('No Texas Longhorns game found in the data');
				}
			} catch (error) {
				if (!signal.aborted) {
					console.error(error);
					setError(error as Error);
				}
			} finally {
				if (!signal.aborted) {
					setLoading(false);
				}
			}
			return true;
		};

		const lastWeekDate = getDateString(-3);
		const previousWeeksDate = getDateString(-7);
		const currentDate = getDateString(0);

		tryFetchData(lastWeekDate, currentDate)
			.then(() => {
				tryFetchData(previousWeeksDate, currentDate);
			})
			.catch((error) => {
				console.error('Error in fetching data:', error);
				setError(error as Error);
			})
			.finally(() => {
				setLoading(false);
			});

		return () => {
			abortController.abort();
		};
	}, [refetchIndex]);

	return { data: formattedData, loading, error, refetch };
};

export default useFetchCurrentGameData;

const getDateString = (daysOffset: number): string => {
	const date = new Date();
	date.setDate(date.getDate() + daysOffset);
	return date.toISOString().split('T')[0].replace(/-/g, '');
};

const extractTexasLonghornsData = (json: any): Game | null => {
	const games: Game[] = json.events;
	const longhornsGame = games.find((game) =>
		game.name.includes('Texas Longhorns')
	);

	return longhornsGame || null;
};

const formatGameData = (game: Game): FormattedGameData => {
	return {
		gameStatus: game.status.type.description,
		homeTeam: game.competitions[0].competitors[0].team.displayName,
		homeTeamScore: game.competitions[0].competitors[0].score,
		awayTeam: game.competitions[0].competitors[1].team.displayName,
		awayTeamScore: game.competitions[0].competitors[1].score,
		venueCity: `${game.competitions[0].venue.address.city}, ${game.competitions[0].venue.address.state}`,
		venueStadium: game.competitions[0].venue.fullName,
	};
};
