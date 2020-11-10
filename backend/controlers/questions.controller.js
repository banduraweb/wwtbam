const Question = require('../models/Question.model');
const Response = require('../helpers/defaultResponse');
const QuestionsService = require('../services/question.service');

class QuestionsController {
  static async getCurrentQuestion(req, res) {
    const { level, usedQuestions } = req.body;
    const response = await QuestionsService.getCurrentQuestion(
      level,
      usedQuestions,
    );
    Response.defaultResponse(res, 200, response);
  }

  static async createNewQuestion(req, res) {
    const question = new Question(req.body);
    const response = await question.save();
    Response.defaultResponse(res, 200, response);
  }

  static async checkAnswer(req, res) {
    const { answerId } = req.body;
    const response = await QuestionsService.checkAnswer(answerId);
    Response.defaultResponse(res, 200, response);
  }

  static async getAnswersFiftyFifty(req, res) {
    const { id } = req.params;
    const response = await QuestionsService.getAnswersFiftyFifty(id);
    Response.defaultResponse(res, 200, response);
  }

  static async getStatistics(req, res) {
    const { id } = req.params;
    const { activeAnswerIds } = req.body;
    const response = await QuestionsService.getStatistics(id, activeAnswerIds);
    Response.defaultResponse(res, 200, response);
  }
}

module.exports = QuestionsController;
