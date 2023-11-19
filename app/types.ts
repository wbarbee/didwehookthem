export interface Game {
	id: string;
	uid: string;
	date: string;
	name: string;
	shortName: string;
	season: Season;
	status: CompetitionStatus;
	week: Week;
	competitions: Competition[];
}

export interface Season {
	year: number;
	type: number;
	slug: string;
}

export interface Week {
	number: number;
}

export interface Team {
	displayName: string;
}

export interface CompetitionStatus {
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

export interface Competitor {
	team: Team;
	score: string;
}

export interface Competition {
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
}
