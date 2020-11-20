import {
  all, call, put, takeLatest,
} from 'redux-saga/effects';
import * as actions from './questionnaireActions';
import QuestionnaireService from '../../services/questionnaire.service';

function* fetchCurrentQuestion({ payload }) {
  try {
    yield put(actions.pushCurrentQuestion.request());
    const result = yield call(QuestionnaireService.getCurrentQuestion, payload);
    yield put(actions.saveCurrentQuestion(result));
    yield put(actions.pushCurrentQuestion.success());
  } catch (e) {
    yield put(actions.pushCurrentQuestion.failure(e));
    yield put(actions.clearCurrentQuestion());
  }
}

function* fetchCheckAnswer({ payload }) {
  try {
    yield put(actions.checkAnswer.request());
    const result = yield call(QuestionnaireService.checkAnswer, payload);
    yield put(actions.saveCheckedAnswer(result));
    yield put(actions.checkAnswer.success());
  } catch (e) {
    yield put(actions.checkAnswer.failure(e));
  }
}

function* fetchFiftyFiftyAnswers({ payload }) {
  try {
    yield put(actions.pushFiftyFiftyAnswers.request());
    const result = yield call(QuestionnaireService.getFiftyFifty, payload);
    yield put(actions.saveFiftyFiftyAnswers(result));
    yield put(actions.pushFiftyFiftyAnswers.success());
  } catch (e) {
    yield put(actions.pushFiftyFiftyAnswers.failure(e));
  }
}

function* fetchStatictics({ payload }) {
  try {
    yield put(actions.pushStatistics.request());
    const result = yield call(QuestionnaireService.getStatistics, payload);
    yield put(actions.saveStatistics(result));
    yield put(actions.pushStatistics.success());
  } catch (e) {
    yield put(actions.pushStatistics.failure(e));
  }
}

function* QuestionnaireWatcher() {
  yield all(
    [
      takeLatest(actions.pushCurrentQuestion, fetchCurrentQuestion),
      takeLatest(actions.checkAnswer, fetchCheckAnswer),
      takeLatest(actions.pushFiftyFiftyAnswers, fetchFiftyFiftyAnswers),
      takeLatest(actions.pushStatistics, fetchStatictics),
    ],
  );
}

export default QuestionnaireWatcher;
