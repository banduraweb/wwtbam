import { combineReducers } from 'redux';
import questionnaire from './modules/questionnaire/questionnaireReducers';
import gameStarter from './modules/gameToggler/gameActivityReducers';

/* Unite all reducers */
const rootReducer = combineReducers({
  questionnaire,
  gameStarter,
});

export default (state, action) => rootReducer(state, action);
