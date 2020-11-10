const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  variant: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
  statics: {
    type: Number,
    default: 0,
  },
});

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  answers: {
    type: [AnswerSchema],
    required: true,
  },
});

const Question = mongoose.model('question', QuestionSchema);
module.exports = Question;
