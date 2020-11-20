import React from 'react';
import classNames from 'classnames';
import style from './Answer.module.scss';
import { ReactComponent as QuestionBlock } from '../../assets/svg/ico-question-block.svg';
import { ReactComponent as QuestionBlockSm } from '../../assets/svg/ico-question-block-sm.svg';
import { ReactComponent as QuestionBlockxSm } from '../../assets/svg/ico-question-block-xsm.svg';
import orderReplacer from '../../helpers/orderReplacer';

const Answer = ({
  idx, variant, handleCheckAnswer, usedId, answerId, selectedAnswer,
  answer, fiftyFiftyAnswers, clientWidth,
}) => {
  const { answers } = fiftyFiftyAnswers;
  const checkIdsFiftyFifty = answers && answers.map(({ _id }) => _id);
  const showAnswer = !checkIdsFiftyFifty
    || (checkIdsFiftyFifty && checkIdsFiftyFifty.includes(answerId));

  const svgBlock = () => {
    if (clientWidth < 340) {
      return <QuestionBlockxSm />;
    } if (clientWidth > 992) {
      return <QuestionBlock />;
    }
    return <QuestionBlockSm />;
  };

  return (
    <div className={style.currentAnswer}>

      <button
        className={classNames(
          (selectedAnswer || !showAnswer) ? style.answerBlockNoHover : style.answerBlock,
        )}
        type="button"
        onClick={() => handleCheckAnswer(usedId, answerId)}
        disabled={selectedAnswer || !showAnswer}
      >
        <div className={classNames(
          style.formSvg,
          selectedAnswer === answerId && style.selected,
          selectedAnswer === answerId && answer.correct === true && style.correct,
          selectedAnswer === answerId && answer.correct === false && style.incorrect,
        )}
        >
          {svgBlock()}
        </div>
        <div className={style.answerContent}>
          <span className={style.order}>
            {orderReplacer[idx]}
          </span>
          <span className={style.variant}>
            {showAnswer ? variant : null}
          </span>
        </div>
      </button>

    </div>
  );
};

export default Answer;
