import { useEffect, useState } from 'react';
import { Game, FormattedGameData } from '../types';

const endpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard';

const useFetchCollegeFootballData = () => {
	const [data, setData] = useState<Game | null>(null);
	const [formattedData, setFormattedData] = useState<FormattedGameData | null>(
		null
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(endpoint);
				const json = await response.json();
				const longhornsData = extractTexasLonghornsData(json);

				setData(longhornsData);
				if (longhornsData) {
					setFormattedData({
						gameStatus: longhornsData.status.type.shortDetail,
						homeTeam:
							longhornsData.competitions[0].competitors[0].team.displayName,
						homeTeamScore: longhornsData.competitions[0].competitors[0].score,
						awayTeam:
							longhornsData.competitions[0].competitors[1].team.displayName,
						awayTeamScore: longhornsData.competitions[0].competitors[1].score,
						venueCity: `${longhornsData.competitions[0].venue.address.city}, ${longhornsData.competitions[0].venue.address.state}`,
						venueStadium: longhornsData.competitions[0].venue.fullName,
					});
				}

				setLoading(false);
			} catch (error) {
				setError(error as Error);
				setLoading(false);
			}
		}

		fetchData();
	}, []);

	return { data: formattedData, loading, error };
};

export default useFetchCollegeFootballData;

function extractTexasLonghornsData(json: any): Game | null {
	const games: Game[] = json.events;
	const longhornsGame = games.find((game) =>
		game.name.includes('Texas Longhorns')
	);

	return longhornsGame || null;
}
