const express = require('express');

const router = express.Router();
const updateStatisticsMiddleware = require('../middlewares/uptadeStatisticsMiddleware');
const QuestionController = require('../controlers/questions.controller');

/**
 * Returns current question
 * @param  { string, array } [level, usedQuestions=[]] req.body
 */
router.get('/', QuestionController.getCurrentQuestion);

/**
 * Returns only 2 answers one - correct, second -incorrect
 * @param  { string } [ id ] req.params
 */
router.get('/fifty-fifty/:id', QuestionController.getAnswersFiftyFifty);

/**
 * Returns users response statistics
 * @param  { string, String[] } [ id ] req.params [activeAnswerIds] req.body
 */
router.get('/help/:id', QuestionController.getStatistics);

/**
 * Returns new instance of question
 * @param  { string, string, Object[] } [question, level, answers] req.body
 */
router.post('/add/question', QuestionController.createNewQuestion);

/**
 * Returns answer status true/false, middleware updates users response statistics
 * @param  { string, string, Object[] } [question, level, answers] req.body
 */
router.get(
  '/check/answer',
  updateStatisticsMiddleware,
  QuestionController.checkAnswer,
);

module.exports = router;
