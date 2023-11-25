import { useEffect, useState } from 'react';
import { Game, FormattedGameData } from '../types';

const endpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';

const useFetchCollegeFootballData = () => {
	const [formattedData, setFormattedData] = useState<FormattedGameData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		async function fetchData() {
			const lastWeekDate = getDateString(-3);
			const currentDate = getDateString(0);

			try {
				const response = await fetch(
					`${endpoint}?dates=${lastWeekDate}-${currentDate}&limit=500`
				);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const json = await response.json();
				const longhornsData = extractTexasLonghornsData(json);
				if (longhornsData) {
					setFormattedData(formatGameData(longhornsData));
				}

				setTimeout(() => {
					setLoading(false);
				}, 1250);
			} catch (error) {
				if (!signal.aborted) {
					setError(error as Error);
					setLoading(false);
				}
			}
		}

		console.log('CALLED');

		fetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	return { data: formattedData, loading, error };
};

export default useFetchCollegeFootballData;

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

	console.log(longhornsGame, json);

	return longhornsGame || null;
};

const formatGameData = (game: Game): FormattedGameData => {
	return {
		gameStatus: game.status.type.shortDetail,
		homeTeam: game.competitions[0].competitors[0].team.displayName,
		homeTeamScore: game.competitions[0].competitors[0].score,
		awayTeam: game.competitions[0].competitors[1].team.displayName,
		awayTeamScore: game.competitions[0].competitors[1].score,
		venueCity: `${game.competitions[0].venue.address.city}, ${game.competitions[0].venue.address.state}`,
		venueStadium: game.competitions[0].venue.fullName,
	};
};
