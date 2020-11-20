import createTriggerRoutine from '../../helpers/createTriggerRoutine';

const prefix = 'activity';

const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const setGameStarted = createTriggerBound('SET_GAME_STARTED');
export const initGame = createTriggerBound('INIT_GAME');
export const resetGame = createTriggerBound('RESET_GAME');
