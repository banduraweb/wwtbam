import createRequestRoutine from '../../helpers/createRequestRoutine';
import createTriggerRoutine from '../../helpers/createTriggerRoutine';

const prefix = 'question';

const createRequestBound = createRequestRoutine.bind(null, prefix);
const createTriggerBound = createTriggerRoutine.bind(null, prefix);

export const pushCurrentQuestion = createRequestBound('QUESTION_PUSH');
export const setLevelUpQuestion = createTriggerBound('QUESTION_LEVEL_UP');
export const saveCurrentQuestion = createTriggerBound('QUESTION_SAVE');
export const clearCurrentQuestion = createTriggerBound('QUESTION_CLEAR');

export const checkAnswer = createRequestBound('ANSWER_CHECK');
export const clearCheckedAnswer = createTriggerBound('ANSWER_CHECK_CLEAR');
export const saveCheckedAnswer = createTriggerBound('ANSWER_CHECKED_SAVE');

export const clearLevelAndStep = createTriggerBound('CLEAR_LEVEL_STEP');

export const pushFiftyFiftyAnswers = createRequestBound('FIFTY_FIFTY_PUSH');
export const saveFiftyFiftyAnswers = createTriggerBound('FIFTY_FIFTY_SAVE');
export const clearFiftyFiftyAnswers = createTriggerBound('FIFTY_FIFTY_CLEAR');

export const pushStatistics = createRequestBound('PUSH_STATISTICS');
export const saveStatistics = createTriggerBound('SAVE_STATISTICS');
export const clearStatistics = createTriggerBound('CLEAR_STATISTICS');
