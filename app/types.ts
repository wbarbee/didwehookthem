export interface Game {
	id: string;
	uid: string;
	date: string;
	name: string;
	shortName: string;
	status: CompetitionStatus;
	competitions: Competition[];
}

export interface GameStatsProps {
	homeTeam: string;
	homeTeamScore: string;
	awayTeam: string;
	gameStatus: string;
	awayTeamScore: string;
	weHookedThem: boolean;
	venueCity: string;
	venueStadium: string;
}

interface TeamInfo {
	teamName: string;
	teamStats: any;
	nextEvent: any;
}

export interface FormattedGameData {
	gameStatus?: string;
	homeTeam?: string;
	homeTeamScore?: string;
	awayTeam?: string;
	awayTeamScore?: string;
	venueCity?: string;
	venueStadium?: string;
	teamInfo?: TeamInfo;
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
}

interface ScheduleStatus {
	type: {
		name: string;
	};
}

export interface ScheduleEvent {
	competitions: ScheduleCompetition[];
}

export interface FormattedScheduleGameData {
	score: number | null;
	teamName: string;
	gameStatus: string;
	gameDate: string;
	teamInfo: any;
}
