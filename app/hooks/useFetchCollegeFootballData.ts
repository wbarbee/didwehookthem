'use client';
import { useEffect, useState } from 'react';
import { Game } from '../types';

const endpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';

const useFetchCollegeFootballData = () => {
	const [data, setData] = useState<Game | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(endpoint);
				const json = await response.json();
				const longhornsData = extractTexasLonghornsData(json);
				setData(longhornsData);
				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return { data, loading, error };
};

export default useFetchCollegeFootballData;

function extractTexasLonghornsData(json: any): Game | null {
	const games: Game[] = json.events;
	console.log(games);
	const longhornsGame = games.find((game) =>
		game.name.includes('Texas Longhorns')
	);

	return longhornsGame || null;
}
