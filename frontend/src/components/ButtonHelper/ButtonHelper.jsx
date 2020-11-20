import React from 'react';

const ButtonHelper = ({
  content = '', handler, className, disabled,
}) => (
  <button
    onClick={handler}
    className={className}
    type="button"
    disabled={disabled}
  >
    {content}

  </button>
);

export default ButtonHelper;
