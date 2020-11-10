const QuestionsService = require('../services/question.service');

async function updateStatisticsMiddleware(req, res, next) {
  const { questionId, answerId } = req.body;
  await QuestionsService.updateStatistics(questionId, answerId);
  next();
}

module.exports = updateStatisticsMiddleware;
