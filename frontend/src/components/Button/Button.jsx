import React from 'react';
import styles from './Button.module.scss';

const Button = ({ text = '', handler }) => (
  <button type="button" className={styles.button} onClick={handler}>{text}</button>
);

export default Button;
