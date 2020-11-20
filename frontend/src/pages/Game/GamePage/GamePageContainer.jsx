import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GamePage from './GamePage';
import en from '../../../config/en';
import {
  checkAnswer, clearCheckedAnswer, clearFiftyFiftyAnswers, clearStatistics,
  pushCurrentQuestion, pushFiftyFiftyAnswers, pushStatistics, setLevelUpQuestion,
} from '../../../modules/questionnaire/questionnaireActions';
import questionnaireSelectors from '../../../modules/questionnaire/questionnaireSelectors';
import Loader from '../../../components/Loader/Loader';
import { REQUEST, SUCCESS } from '../../../constants/constants';
import { setGameStarted } from '../../../modules/gameToggler/gameActivityActions';
import orderReplacer from '../../../helpers/orderReplacer';
import useWindowSize from '../../../hooks/useWindowSize';

const GamePageContainer = () => {
  const { width } = useWindowSize();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isUsedFifty, setUsedFifty] = useState(false);
  const [isUsedStatistics, setUsedStatistics] = useState(false);
  const [statsHelp, setStatsHelp] = useState([]);
  const [burgerMenu, setBurgerMenu] = useState(false);
  const dispatch = useDispatch();
  const { data, errors, status } = useSelector(questionnaireSelectors.getCurrentQuestion);
  const {
    data: fiftyFiftyAnswers,
    status: fiftyFiftyStatus,
  } = useSelector(questionnaireSelectors.getFiftyFiftyAnswers);

  const {
    level, usedQuestions, step, guaranteedAmountWon,
  } = useSelector(questionnaireSelectors.getCurrentLevelAndStep);
  const {
    status: checkedStatus,
    answer,
  } = useSelector(questionnaireSelectors.checkedAnswerResult);

  const {
    status: statisticsStatus,
    data: statisticsInfo,
  } = useSelector(questionnaireSelectors.getStatistics);

  const toggle = () => setBurgerMenu(!burgerMenu);

  useEffect(() => {
    if (width > 992) {
      setBurgerMenu(false);
    }
  }, [width]);

  useEffect(() => {
    if (step > 1) {
      dispatch(pushCurrentQuestion({ level, usedQuestions }));
    }
  }, [step, dispatch, level, usedQuestions]);

  const handleContinueGame = useCallback(() => {
    const payload = {
      level, usedQuestions, step, usedId: data._id,
    };
    if (Object.values(fiftyFiftyAnswers).length) {
      dispatch(clearFiftyFiftyAnswers());
    }
    dispatch(setLevelUpQuestion(payload));
    dispatch(clearStatistics());
    dispatch(clearCheckedAnswer());
    setSelectedAnswer(null);
  }, [level, usedQuestions, step, data._id, dispatch, fiftyFiftyAnswers]);

  const handleEndGame = useCallback(() => {
    dispatch(setGameStarted(false));
    dispatch(clearCheckedAnswer());
    dispatch(clearFiftyFiftyAnswers());
    dispatch(clearStatistics());
  }, [dispatch]);

  useEffect(() => {
    if (guaranteedAmountWon === 1000000) {
      handleEndGame();
    }
  }, [guaranteedAmountWon, handleEndGame]);

  useEffect(() => {
    if (answer.correct === true) {
      setTimeout(() => {
        handleContinueGame();
      }, 2000);
    } else if (answer.correct === false) {
      setTimeout(() => {
        handleEndGame();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer.correct]);

  useEffect(() => {
    if (fiftyFiftyStatus === SUCCESS) {
      setUsedFifty(true);
    }
  }, [fiftyFiftyStatus]);

  useEffect(() => {
    if (statisticsStatus === SUCCESS) {
      setUsedStatistics(true);
    }
  }, [statisticsStatus]);

  useEffect(() => {
    if (statisticsInfo.length > 0) {
      const allAnswersId = data.answers.map(({ _id }) => _id);
      const orderToStatistics = statisticsInfo.map((stats) => {
        const index = allAnswersId.findIndex((el) => stats._id === el);
        return {
          ...stats,
          order: orderReplacer[index],
        };
      });
      setStatsHelp(orderToStatistics);
    } else {
      setStatsHelp([]);
    }
  }, [statisticsInfo, data]);

  const handleCheckAnswer = (questionId, answerId) => {
    setSelectedAnswer(answerId);
    setTimeout(() => {
      dispatch(checkAnswer({ questionId, answerId }));
    }, 2000);
  };

  const handleUseFifty = (id) => {
    dispatch(pushFiftyFiftyAnswers(id));
  };

  const handleUseStatistics = (questionId) => {
    const allAnswersId = data.answers.map(({ _id }) => _id);
    const fiftyFiftyAnswersId = fiftyFiftyAnswers.answers
      ? fiftyFiftyAnswers.answers.map(({ _id }) => _id)
      : [];
    const activeAnswerIds = fiftyFiftyAnswersId.length === 2
      ? allAnswersId.filter((id) => fiftyFiftyAnswersId.includes(id))
      : allAnswersId;
    dispatch(pushStatistics({ questionId, activeAnswerIds }));
  };

  if ([status, fiftyFiftyStatus, statisticsStatus].some((reqStatus) => reqStatus === REQUEST)) {
    return <Loader />;
  }

  return (
    <div>
      <GamePage
        clientWidth={width}
        toggle={toggle}
        burgerMenu={burgerMenu}
        guaranteedAmountWon={guaranteedAmountWon}
        step={step}
        statsHelp={statsHelp}
        fiftyFiftyAnswers={fiftyFiftyAnswers}
        handleUseStatistics={handleUseStatistics}
        handleUseFifty={handleUseFifty}
        isUsedFifty={isUsedFifty}
        isUsedStatistics={isUsedStatistics}
        checkedStatus={checkedStatus}
        answer={answer}
        selectedAnswer={selectedAnswer}
        headlines={en}
        data={data}
        errors={errors}
        status={status}
        handleCheckAnswer={handleCheckAnswer}
      />
    </div>
  );
};

export default GamePageContainer;
