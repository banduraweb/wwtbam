/* eslint-disable */
import { toast } from 'react-toastify';
import React from 'react';

import Error from '../components/Alerts/Error';

toast.configure();

export default class Notification {
  static defaultConfig = { position: toast.POSITION.TOP_CENTER };

  static error(message = 'Something went wrong', config = this.defaultConfig) {
    return toast.error(<Error message={message} />, config);
  }
}
