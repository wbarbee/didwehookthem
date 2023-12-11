export interface Game {
	id: string;
	uid: string;
	date: string;
	name: string;
	shortName: string;
	status: CompetitionStatus;
	competitions: Competition[];
}

export interface FormattedGameData {
	team1Name: string;
	team1Score: string | number | null;
	team2Name: string;
	team2Score: string | number | null;
	gameStatus: string;
	gameDate: string;
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

export type FormattedGameDataOrArray = FormattedGameData | FormattedGameData[];

export interface GameData {
	teamName: string;
	score: number | null;
	gameStatus: string;
	gameDate: string;
	teamInfo?: string;
}

export interface NavProps {
	data: FormattedGameData[] | null;
	loading: boolean;
	error: any;
}

export interface GameDataProps {
	data: FormattedGameData | null;
	loading: boolean;
	error: any;
}

interface Venue {
	address: {
		city: string;
		state: string;
	};
	fullName: string;
}

interface Team {
	displayName: string;
	abbreviation?: string;
}

interface CompetitionStatus {
	clock: number;
	displayClock: string;
	period: number;
	type: {
		id: string;
		name: string;
		state: string;
		completed: boolean;
		description: string;
		detail: string;
		shortDetail: string;
	};
}

interface Competitor {
	team: Team;
	score: string;
}

interface Competition {
	id: string;
	uid: string;
	date: string;
	attendance: number;
	timeValid: boolean;
	neutralSite: boolean;
	competitors: Competitor[];
	conferenceCompetition: boolean;
	playByPlayAvailable: boolean;
	recent: boolean;
	status: CompetitionStatus;
	startDate: string;
	venue: Venue;
}

interface ScheduleTeam {
	displayName?: string;
	abbreviation?: string;
}

interface ScheduleCompetitor {
	score?: {
		value: number | null;
	};
	team?: ScheduleTeam;
	date: string;
}

interface ScheduleCompetition {
	competitors: ScheduleCompetitor[];
	status: ScheduleStatus;
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
}

interface ScheduleStatus {
	clock: number;
	displayClock: string;
	period: number;
	type: {
		name: string;
	};
}

export interface ScheduleEvent {
	competitions: ScheduleCompetition[];
	gameStatus: string;
	seasonType: {
		name: string;
	};
}
