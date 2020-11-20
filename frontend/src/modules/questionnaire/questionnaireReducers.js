import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './questionnaireActions';
import { makeStatusWithResetReducer } from '../../helpers/reduxHelpers';

const initCurrentQuestion = {};
export const initLevelAndStep = {
  level: 'easy', usedQuestions: [], step: 1, guaranteedAmountWon: 0,
};
const initCheckedAnswer = {};

const initFiftyFftyAnswer = {};

const initStatistics = [];

const currentLevelAndStep = handleActions(
  {
    [actions.setLevelUpQuestion.TRIGGER](state, { payload }) {
      switch (payload.step) {
        case 4:
          return {
            level: 'medium', usedQuestions: [], step: state.step + 1, guaranteedAmountWon: 4000,
          };
        case 8:
          return {
            level: 'hard', usedQuestions: [], step: state.step + 1, guaranteedAmountWon: 64000,
          };
        case 12:
          return { ...state, guaranteedAmountWon: 1000000 };
        default:
          return {
            ...state,
            usedQuestions: [...state.usedQuestions, payload.usedId],
            step: state.step + 1,
          };
      }
    },
    [actions.clearLevelAndStep.TRIGGER]() {
      return initLevelAndStep;
    },
  },
  initLevelAndStep,
);

const errors = handleActions(
  {
    [actions.pushCurrentQuestion.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearCurrentQuestion.TRIGGER]() {
      return null;
    },
  },
  null,
);

const currentQuestion = handleActions(
  {
    [actions.saveCurrentQuestion.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearCurrentQuestion.TRIGGER]() {
      return initCurrentQuestion;
    },
  },
  initCurrentQuestion,
);

const errorsCheckAnswer = handleActions(
  {
    [actions.checkAnswer.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearCheckedAnswer.TRIGGER]() {
      return null;
    },
  },
  null,
);

const currentCheckedAnswer = handleActions(
  {
    [actions.saveCheckedAnswer.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearCheckedAnswer.TRIGGER]() {
      return initCheckedAnswer;
    },
  },
  initCheckedAnswer,
);

const fifityFiftyAnswers = handleActions(
  {
    [actions.saveFiftyFiftyAnswers.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearFiftyFiftyAnswers.TRIGGER]() {
      return initFiftyFftyAnswer;
    },
  },
  initFiftyFftyAnswer,
);

const errorsFiftyFiftyAnswers = handleActions(
  {
    [actions.pushFiftyFiftyAnswers.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearFiftyFiftyAnswers.TRIGGER]() {
      return null;
    },
  },
  null,
);

const statisticsHelp = handleActions(
  {
    [actions.saveStatistics.TRIGGER](state, { payload }) {
      return payload;
    },
    [actions.clearStatistics.TRIGGER]() {
      return initStatistics;
    },
  },
  initStatistics,
);

const errorsStatistics = handleActions(
  {
    [actions.pushStatistics.FAILURE](state, { payload }) {
      return payload;
    },
    [actions.clearStatistics.TRIGGER]() {
      return null;
    },
  },
  null,
);

const question = combineReducers({
  status: makeStatusWithResetReducer(actions.pushCurrentQuestion, actions.clearCurrentQuestion),
  data: currentQuestion,
  errors,
  currentStep: currentLevelAndStep,
});

const step = combineReducers({
  currentStep: currentLevelAndStep,
});

const checkedAnswer = combineReducers({
  status: makeStatusWithResetReducer(actions.checkAnswer, actions.clearCheckedAnswer),
  answer: currentCheckedAnswer,
  errorsCheckAnswer,
});

const fiftyFifty = combineReducers({
  status: makeStatusWithResetReducer(actions.pushFiftyFiftyAnswers, actions.clearFiftyFiftyAnswers),
  data: fifityFiftyAnswers,
  errorsFiftyFiftyAnswers,
});

const statistics = combineReducers({
  status: makeStatusWithResetReducer(actions.pushStatistics, actions.clearStatistics),
  data: statisticsHelp,
  errorsStatistics,
});

const questionnaire = combineReducers({
  question,
  step,
  checkedAnswer,
  fiftyFifty,
  statistics,
});

export default questionnaire;
