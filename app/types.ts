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

export interface FormattedGameData {
	gameStatus?: string;
	homeTeam?: string;
	homeTeamScore?: string;
	awayTeam?: string;
	awayTeamScore?: string;
	venueCity?: string;
	venueStadium?: string;
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
