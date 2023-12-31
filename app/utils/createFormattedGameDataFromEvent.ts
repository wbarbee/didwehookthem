import { FormattedGameData, ScheduledEvent } from '../types';

function createFormattedGameDataFromEvent(
	event: ScheduledEvent
): FormattedGameData {
	const gameStatus = event.competitions[0].status.type.name ?? '';
	const gameDate = new Date(event.competitions[0].date ?? '');
	const seasonType = event.competitions[0].status.type.name;
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
		gameHeadline?.toUpperCase() ?? ''
	);
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
	gameHeadline: string
): FormattedGameData {
	return {
		team1Name: competitor1?.team?.abbreviation ?? '',
		team1Score: competitor1?.score?.value ?? '0',
		team2Name: competitor2?.team?.abbreviation ?? '',
		team2Score: competitor2?.score?.value ?? '0',
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

export { createFormattedGameDataFromEvent, createFormattedGameData };
