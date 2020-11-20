import api from '../api/api';

const getCurrentQuestion = (payload) => api.post('/', payload);
const checkAnswer = (payload) => api.post('/check/answer', payload);
const getFiftyFifty = (id) => api.get(`/fifty-fifty/${id}`);
const getStatistics = (payload) => api.post(`/help/${payload.questionId}`, payload);

const questionnaireService = {
  getCurrentQuestion,
  checkAnswer,
  getFiftyFifty,
  getStatistics,
};

export default questionnaireService;
