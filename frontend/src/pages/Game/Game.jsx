import React from 'react';
import { useSelector } from 'react-redux';
import StartPageContainer from './StartPage/StartPageContainer';
import GamePageContainer from './GamePage/GamePageContainer';
import gameActivitySelectors from '../../modules/gameToggler/gameActivitySelectors';

const Game = () => {
  const isGameStarted = useSelector(gameActivitySelectors.isGameStarted);
  if (!isGameStarted) {
    return <StartPageContainer />;
  }

  return (
    <div>
      <GamePageContainer />
    </div>
  );
};

export default Game;
