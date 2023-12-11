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
