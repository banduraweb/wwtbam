import React from 'react';
import classNames from 'classnames';
import styles from './Statistics.module.scss';

const Statistics = ({ statsHelp }) => (
  <div className={styles.st}>
    <ul className={styles.list}>
      {statsHelp.sort((a, b) => a.order.localeCompare(b.order))
        .map(({ _id, statics, order }) => (
          <li key={_id} className={styles.listItem}>
            <span className={styles.order}>{order}</span>
            <span className={styles.data}>
              {statics.toFixed(3).slice(0, -1)}
              %
            </span>
            <span
              style={{ width: `${statics}px` }}
              className={classNames(
                styles.chart,
                order === 'A' && styles.chartRed,
                order === 'B' && styles.chartGreen,
                order === 'C' && styles.chartYellow,
                order === 'D' && styles.chartBlue,
              )}
            />
          </li>
        ))}
    </ul>
  </div>
);

export default Statistics;
