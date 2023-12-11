export interface FormattedGameData {
	team1Name: string;
	team1Score: string | number | null;
	team2Name: string;
	team2Score: string | number | null;
	gameStatus: string;
	gameDate: string;
	formattedGameDate: string;
	seasonType: string;
	neutralSite: boolean;
	venueCity: string;
	venueState: string;
	venueStadium: string;
	gamePeriod: number | null;
	gameClockDisplay: string;
	gameHeadline: string;
	weHookedThem?: boolean;
}

export interface ScheduleEvent {
	competitions: ScheduleCompetition[];
	gameStatus: string;
	seasonType: {
		name: string;
	};
}
interface ScheduleCompetitor {
	score?: {
		value: number | null;
	};
	team?: {
		displayName?: string;
		abbreviation?: string;
	};
	date: string;
}

interface ScheduleCompetition {
	competitors: ScheduleCompetitor[];
	status: {
		clock: number;
		displayClock: string;
		period: number;
		type: {
			name: string;
		};
	};
	date?: string;
	neutralSite: boolean;
	notes: {
		type: string;
		headline: string;
	};
	venue: {
		address: {
			city: string;
			state: string;
			zipCode: string;
		};
		fullName: string;
	};
	type?: {
		text: string;
	};
}
