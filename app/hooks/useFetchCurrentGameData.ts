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

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		const fetchData = async (startDate: string, endDate: string) => {
			try {
				const responseScoreboard = await fetch(
					`${scoreboardEndpoint}?dates=${startDate}-${endDate}&limit=500`,
					{ method: 'GET', cache: 'no-cache' }
				);
				if (!responseScoreboard.ok) {
					throw new Error('Network response was not ok for scoreboard');
				}
				const jsonScoreboard = await responseScoreboard.json();

				const responseTeam = await fetch(teamEndpoint, {
					method: 'GET',
					cache: 'no-cache',
				});
				if (!responseTeam.ok) {
					throw new Error('Network response was not ok for team info');
				}
				const jsonTeam = await responseTeam.json();

				const longhornsData = extractTexasLonghornsData(jsonScoreboard);
				if (longhornsData) {
					const combinedData = formatGameData(longhornsData);
					console.log(combinedData);
					combinedData.teamInfo = jsonTeam.team;

					setFormattedData(combinedData);
				} else {
					throw new Error('No data found');
				}
			} catch (error) {
				if (!signal.aborted) {
					console.error(error);
					setError(error as Error);
					return false;
				}
			} finally {
				setLoading(false);
			}
			return true;
		};

		const tryFetchData = async () => {
			const lastWeekDate = getDateString(-3);
			const previousWeeksDate = getDateString(-7);
			const currentDate = getDateString(0);

			const success = await fetchData(lastWeekDate, currentDate);
			if (!success) {
				await fetchData(previousWeeksDate, currentDate);
			}
		};

		tryFetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	return { data: formattedData, loading, error };
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
