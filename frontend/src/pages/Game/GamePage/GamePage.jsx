import React from 'react';
import classNames from 'classnames';
import style from './GamePage.module.scss';
import Answer from '../../../components/Answer/Answer';
import ButtonHelper from '../../../components/ButtonHelper/ButtonHelper';
import Statistics from '../../../components/Statistics/Statistics';
import { winList } from '../../../constants/constants';
import { ReactComponent as ScoreBlock } from '../../../assets/svg/ico-score.svg';
import { ReactComponent as BtnOpen } from '../../../assets/svg/ico-open.svg';
import { ReactComponent as BtnClose } from '../../../assets/svg/ico-close.svg';

const GamePage = ({
  data, handleCheckAnswer, selectedAnswer,
  checkedStatus, answer,
  handleUseStatistics,
  handleUseFifty,
  isUsedFifty,
  isUsedStatistics,
  fiftyFiftyAnswers,
  statsHelp,
  step,
  toggle,
  burgerMenu,
  clientWidth,
}) => {
  const { question, answers } = data;

  return (

    <div className={style.gameBoardContainer}>
      <div>
        <button type="button" className={style.mobBtn} onClick={toggle}>
          {burgerMenu ? <BtnClose /> : <BtnOpen />}

        </button>
      </div>
      <div className={style.questionnaireWrapper}>
        <div className={style.currentQuestion}>{question}</div>
        <div className={style.helpers}>
          <ButtonHelper
            content="50/50"
            handler={() => handleUseFifty(data._id)}
            className={classNames(
              (selectedAnswer || isUsedFifty) ? style.helpBtnNoHover : style.helpBtn,
              isUsedFifty && style.used,
            )}
            disabled={selectedAnswer || isUsedFifty}
          />
          <ButtonHelper
            content="Statistics"
            handler={() => handleUseStatistics(data._id)}
            className={classNames(style.statistics,
              (selectedAnswer || isUsedStatistics) ? style.helpBtnNoHover : style.helpBtn,
              isUsedStatistics && style.used)}
            disabled={selectedAnswer || isUsedStatistics}
          />
        </div>
        <div>
          {!!statsHelp.length && <Statistics statsHelp={statsHelp} />}

        </div>
        <div className={style.answersWrapper}>
          {answers.map(({ _id, variant }, idx) => (
            <Answer
              clientWidth={clientWidth}
              fiftyFiftyAnswers={fiftyFiftyAnswers}
              checkedStatus={checkedStatus}
              answer={answer}
              selectedAnswer={selectedAnswer}
              handleCheckAnswer={handleCheckAnswer}
              key={_id}
              usedId={data._id}
              variant={variant}
              idx={idx}
              answerId={_id}
            />
          ))}
        </div>
      </div>
      <div />
      <div className={classNames(
        burgerMenu ? style.winListMobile : style.winList,

      )}
      >
        {winList.map((el, i) => (
          <div
            className={classNames(
              style.scoreBlockItem,
              burgerMenu && style.scoreBlockItemMobile,
              winList.length - step === i && style.current && style.scoreBlockItemActive,

            )}
            key={el}
          >
            <div className={classNames(
              style.content,
              winList.length - step === i && style.contentActive,
              winList.length - step < i && style.passed,
            )}
            >
              <ScoreBlock />
              <span className={classNames(
                style.count,
                winList.length - step < i && style.passed,
                i % 4 === 0 && style.guaranteed,
              )}
              >
                $
                {el.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamePage;
