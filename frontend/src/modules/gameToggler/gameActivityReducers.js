import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './gameActivityActions';

const isGameStarted = false;
const initGame = false;

const startGame = handleActions(
  {
    [actions.setGameStarted.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetGame.TRIGGER]() {
      return isGameStarted;
    },
  },
  isGameStarted,
);

const init = handleActions(
  {
    [actions.initGame.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.resetGame.TRIGGER]() {
      return initGame;
    },
  },
  initGame,
);

const gameStarter = combineReducers({
  startGame,
  init,
});

export default gameStarter;
