import { FormattedGameData } from '../types';

const weHookedThem = (gameData: FormattedGameData) => {
	if (gameData.team1Score && gameData.team2Score) {
		return (
			(gameData.team1Name === 'TEX' &&
				gameData.team1Score > gameData.team2Score) ||
			(gameData.team2Name === 'TEX' &&
				gameData.team2Score > gameData.team1Score)
		);
	}
};

export default weHookedThem;
