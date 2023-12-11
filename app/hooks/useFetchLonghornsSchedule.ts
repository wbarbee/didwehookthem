import { useEffect, useState } from 'react';
import { ScheduleEvent, FormattedGameData } from '../types';

const endpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/texas/schedule';

const useFetchCurrentGameData = () => {
	const [formattedData, setFormattedData] = useState<
		FormattedGameData[] | null
	>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		const fetchData = async () => {
			try {
				const response = await fetch(endpoint);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const json = await response.json();
				const events = json.events;
				if (events) {
					setFormattedData(formatGameData(events));
				} else {
					throw new Error('No events found');
				}
			} catch (error) {
				if (!signal.aborted) {
					setError(error as Error);
				}
			} finally {
				setTimeout(() => {
					setLoading(false);
				}, 1200);
			}
		};

		fetchData();

		return () => {
			abortController.abort();
		};
	}, []);

	return { data: formattedData, loading, error };
};

export default useFetchCurrentGameData;

function formatGameData(events: ScheduleEvent[]): FormattedGameData[] {
	return events.map((event) => {
		const gameStatus = event.competitions[0].status.type.name ?? '';
		const gameDate = new Date(event.competitions[0].date ?? '');
		const formattedDate = `${gameDate.getMonth() + 1}/${gameDate.getDate()}`;
		const seasonType = event.seasonType.name;
		const neutralSite = event.competitions[0].neutralSite;
		const venueCity = event.competitions[0].venue.address.city;
		const venueState = event.competitions[0].venue.address.state;
		const venueStadium = event.competitions[0].venue.fullName;
		const gamePeriod = event.competitions[0].status.period;
		const gameClockDisplay = event.competitions[0].status.displayClock;
		const gameHeadline = event.competitions[0].notes.headline;

		const competitors = event.competitions[0].competitors;
		return {
			team1Name: competitors[0]?.team?.abbreviation ?? '',
			team1Score: competitors[0]?.score?.value ?? null,
			team2Name: competitors[1]?.team?.abbreviation ?? '',
			team2Score: competitors[1]?.score?.value ?? null,
			gameStatus,
			gameDate: formattedDate,
			seasonType,
			neutralSite,
			venueCity,
			venueState,
			venueStadium,
			gamePeriod,
			gameClockDisplay,
			gameHeadline,
		};
	});
}
