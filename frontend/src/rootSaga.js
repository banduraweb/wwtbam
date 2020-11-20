import { all, fork } from 'redux-saga/effects';
import QuestionireWatcher from './modules/questionnaire/questionnaireWorkers';

export default function* rootSaga() {
  yield all([
    fork(QuestionireWatcher),
  ]);
}
