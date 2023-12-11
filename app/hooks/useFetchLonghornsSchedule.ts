import { useEffect, useState } from 'react';
import { ScheduledEvent, FormattedGameData } from '../types';
import constants from '../utils/constants';

const useFetchCurrentGameData = () => {
	const [formattedData, setFormattedData] = useState<
		FormattedGameData[] | null
	>(null);
	const [mostRecentGameData, setMostRecentGameData] =
		useState<FormattedGameData | null>(null);
	const [upcomingGameData, setUpcomingGameData] =
		useState<FormattedGameData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const abortController = new AbortController();
		const { signal } = abortController;

		const fetchData = async () => {
			try {
				const response = await fetch(constants.apiFetchFullScheduleEndpoint, {
					signal,
				});
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const json = await response.json();
				const events = json.events;
				if (events) {
					setFormattedData(formatGameData(events));
					setMostRecentGameData(lastAvailableGameData(events));
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

	return {
		data: formattedData,
		mostRecentGameData,
		upcomingGameData,
		loading,
		error,
	};
};

export default useFetchCurrentGameData;

function createFormattedGameDataFromEvent(
	event: ScheduledEvent
): FormattedGameData {
	const gameStatus = event.competitions[0].status.type.name ?? '';
	const gameDate = new Date(event.competitions[0].date ?? '');
	const seasonType = event.seasonType.name;
	const neutralSite = event.competitions[0].neutralSite;
	const venueCity = event.competitions[0].venue.address.city;
	const venueState = event.competitions[0].venue.address.state;
	const venueStadium = event.competitions[0].venue.fullName;
	const gamePeriod = event.competitions[0].status.period;
	const gameClockDisplay = event.competitions[0].status.displayClock;
	const gameHeadline =
		event.competitions[0]?.notes && event.competitions[0].notes.length > 0
			? event.competitions[0].notes[0].headline
			: undefined;
	const competitor1 = event.competitions[0].competitors[0];
	const competitor2 = event.competitions[0].competitors[1];

	return createFormattedGameData(
		competitor1,
		competitor2,
		gameStatus,
		gameDate,
		seasonType,
		neutralSite,
		venueCity,
		venueState,
		venueStadium,
		gamePeriod,
		gameClockDisplay,
		gameHeadline
	);
}

function formatGameData(events: ScheduledEvent[]): FormattedGameData[] {
	return events.map(createFormattedGameDataFromEvent);
}

function lastAvailableGameData(
	events: ScheduledEvent[]
): FormattedGameData | null {
	const lastEvent = events
		.filter(
			(event) => event.competitions[0].status.type.name === 'STATUS_FINAL'
		)
		.pop();

	return lastEvent ? createFormattedGameDataFromEvent(lastEvent) : null;
}

function createFormattedGameData(
	competitor1: any,
	competitor2: any,
	gameStatus: string,
	gameDate: Date,
	seasonType: string,
	neutralSite: boolean,
	venueCity: string,
	venueState: string,
	venueStadium: string,
	gamePeriod: number,
	gameClockDisplay: string,
	gameHeadline: any
): FormattedGameData {
	return {
		team1Name: competitor1?.team?.abbreviation ?? '',
		team1Score: competitor1?.score?.value ?? null,
		team2Name: competitor2?.team?.abbreviation ?? '',
		team2Score: competitor2?.score?.value ?? null,
		gameStatus,
		gameDate:
			`${gameDate.getMonth() + 1}`.padStart(2, '0') +
			'/' +
			`${gameDate.getDate()}`.padStart(2, '0') +
			'/' +
			gameDate.getFullYear(),
		formattedGameDate:
			`${gameDate.getMonth() + 1}`.padStart(2, '0') +
			'/' +
			`${gameDate.getDate()}`.padStart(2, '0'),
		seasonType,
		neutralSite,
		venueCity,
		venueState,
		venueStadium,
		gamePeriod,
		gameClockDisplay,
		gameHeadline,
	};
}
