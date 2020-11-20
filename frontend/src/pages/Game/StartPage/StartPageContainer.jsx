import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StartPage from './StartPage';
import {
  clearLevelAndStep,
  pushCurrentQuestion,
} from '../../../modules/questionnaire/questionnaireActions';
import { initGame, setGameStarted } from '../../../modules/gameToggler/gameActivityActions';
import questionnaireSelectors from '../../../modules/questionnaire/questionnaireSelectors';
import gameActivitySelectors from '../../../modules/gameToggler/gameActivitySelectors';
import { initLevelAndStep } from '../../../modules/questionnaire/questionnaireReducers';
import useWindowSize from '../../../hooks/useWindowSize';

const StartPageContainer = () => {
  const dispatch = useDispatch();
  const { guaranteedAmountWon } = useSelector(questionnaireSelectors.getCurrentLevelAndStep);
  const initGameStatus = useSelector(gameActivitySelectors.isGameInit);

  const handleStartGame = () => {
    dispatch(clearLevelAndStep());
    dispatch(pushCurrentQuestion(initLevelAndStep));
    dispatch(setGameStarted(true));
    dispatch(initGame(true));
  };

  const { width } = useWindowSize();

  return (
    <div>
      <StartPage
        clientWidth={width}
        gameIsInited={initGameStatus}
        handler={handleStartGame}
        guaranteedAmountWon={guaranteedAmountWon}
      />
    </div>
  );
};

export default StartPageContainer;
