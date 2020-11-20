const isGameStarted = (state) => state.gameStarter.startGame;
const isGameInit = (state) => state.gameStarter.init;

const gameActivity = {
  isGameStarted,
  isGameInit,
};

export default gameActivity;
