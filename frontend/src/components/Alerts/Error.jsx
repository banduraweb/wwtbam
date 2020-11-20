import React from 'react';
import style from './Error.module.scss';

const Error = ({ message }) => (
  <div>
    <div className={style.error}>{message}</div>
  </div>
);
export default Error;
