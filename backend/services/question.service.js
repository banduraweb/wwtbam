/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
const { Types } = require('mongoose');
const Question = require('../models/Question.model');
const Random = require('../helpers/randomInteger');

const { ObjectId } = Types;

class QuestionService {
  static async getCurrentQuestion(level, usedQuestions = []) {
    try {
      const filter = {
        $and: [{ level: { $eq: level }, _id: { $nin: [...usedQuestions] } }],
      };
      const result = await Question.find(filter);
      return this.randomNewQuestionByLevel(result);
    } catch (error) {
      return { error };
    }
  }

  static randomNewQuestionByLevel(list) {
    const index = Random.randomInteger(0, list.length - 1);
    return this.shuffleAnswers(list[index]);
  }

  static shuffleAnswers(question) {
    const result = {
      ...question.toObject(),
      answers: question.answers
        .map(({ _id, variant }) => ({
          _id,
          variant,
        }))
        .sort(() => 0.5 - Math.random()),
    };
    return result;
  }

  static async checkAnswer(answerId) {
    try {
      const [result] = await Question.aggregate([
        { $unwind: '$answers' },
        { $match: { 'answers._id': { $eq: ObjectId(answerId) } } },
      ]);
      const { answers } = result;
      if (answers.isCorrect) {
        return { correct: true };
      }
      return { correct: false };
    } catch (error) {
      return { error };
    }
  }

  static async getQuestionById(questionId) {
    try {
      const question = await Question.findOne({ _id: questionId });
      return question;
    } catch (error) {
      return { error };
    }
  }

  static async getAnswersFiftyFifty(questionId) {
    try {
      const question = await this.getQuestionById(questionId);
      const correct = question
        .toObject()
        .answers.sort(() => 0.5 - Math.random())
        .find((answer) => answer.isCorrect);
      const inCorrect = question
        .toObject()
        .answers.sort(() => 0.5 - Math.random())
        .find((answer) => !answer.isCorrect);
      const fiftyFifty = [correct, inCorrect];
      const result = {
        ...question.toObject(),
        answers: fiftyFifty
          .map(({ _id, variant }) => ({
            _id,
            variant,
          }))
          .sort(() => 0.5 - Math.random()),
      };
      return result;
    } catch (error) {
      return { error };
    }
  }

  static async getStatistics(questionId, activeAnswerIds = []) {
    try {
      const question = await this.getQuestionById(questionId);
      const { answers } = question.toObject();
      const activeAnswers = answers
        .filter((answer) => activeAnswerIds.includes(answer._id.toString()));
      const totalAnswers = activeAnswers.reduce(
        (acc, { statics }) => acc + statics,
        0,
      );
      const result = activeAnswers.map(({ statics, _id, variant }) => ({
        statics:
          totalAnswers === 0
            ? 100 / activeAnswers.length
            : (statics * 100) / totalAnswers,
        _id,
        variant,
      }));
      return result;
    } catch (error) {
      return { error };
    }
  }

  static async updateStatistics(questionId, answerId) {
    try {
      const question = await this.getQuestionById(questionId);
      const updatedQuestion = {
        ...question.toObject(),
        answers: question.answers.map((answer) => {
          if (answer._id.toString() === answerId) {
            return {
              ...answer.toObject(),
              statics: answer.statics + 1,
            };
          }
          return {
            ...answer.toObject(),
          };
        }),
      };

      return await Question.updateOne(
        { _id: questionId },
        { $set: updatedQuestion },
      );
    } catch (error) {
      return { error };
    }
  }
}

module.exports = QuestionService;
