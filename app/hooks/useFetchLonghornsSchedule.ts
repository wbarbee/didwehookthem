import { useEffect, useState } from 'react';
import { ScheduleEvent, FormattedScheduleGameData } from '../types';

const endpoint =
	'https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/texas/schedule';

const useFetchCollegeFootballData = () => {
	const [formattedData, setFormattedData] = useState<
		FormattedScheduleGameData[][] | null
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

export default useFetchCollegeFootballData;

function formatGameData(
	events: ScheduleEvent[]
): FormattedScheduleGameData[][] {
	return events.map(
		(event) =>
			event.competitions[0].competitors
				.map((competitor) => {
					const scoreValue = competitor.score?.value ?? null;
					const teamName = competitor.team?.abbreviation ?? '';

					return {
						score: scoreValue,
						teamName: teamName,
					};
				})
				.filter((item) => item.score !== null) // Filter out entries with null score
	);
}
