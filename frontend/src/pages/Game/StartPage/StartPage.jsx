import React from 'react';
import classNames from 'classnames';
import en from '../../../config/en';
import styles from './StartPage.module.scss';
import Button from '../../../components/Button/Button';
import { ReactComponent as CoolHand } from '../../../assets/svg/ico-cool.svg';
import { ReactComponent as CoolHandMob } from '../../../assets/svg/ico-cool-mob.svg';

const StartPage = ({
  handler, gameIsInited = false, guaranteedAmountWon, clientWidth,
}) => (
  <div className={classNames(
    styles.startPage,
    gameIsInited && styles.startPageInit,
  )}
  >
    <div className={styles.contentWrapper}>
      <div>{clientWidth > 1200 ? <CoolHand /> : <CoolHandMob />}</div>
      <div className={styles.gameInitedInfo}>
        {gameIsInited
          ? (
            <div>
              <div className={styles.totalScore}>{en.totalScore}</div>
              <div className={styles.earned}>
                $
                {guaranteedAmountWon.toLocaleString()}
                {' '}
                {en.earned}
              </div>
            </div>
          )
          : <div className={styles.contentTitle}>{en.whoWantsToBeAMillionaire}</div>}
        <div className={styles.btnContainer}>
          <Button text={gameIsInited ? en.tryAgain : en.start} handler={handler} />
        </div>
      </div>
    </div>
  </div>
);

export default StartPage;
