const getCurrentQuestion = (state) => state.questionnaire.question;
const getCurrentLevelAndStep = (state) => state.questionnaire.step.currentStep;
const checkedAnswerResult = (state) => state.questionnaire.checkedAnswer;
const getFiftyFiftyAnswers = (state) => state.questionnaire.fiftyFifty;
const getStatistics = (state) => state.questionnaire.statistics;

const questionnaireSelectors = {
  getCurrentQuestion,
  getCurrentLevelAndStep,
  checkedAnswerResult,
  getFiftyFiftyAnswers,
  getStatistics,
};

export default questionnaireSelectors;
