import React from 'react';

import {
  Alert,
  AlertTitle,
} from '@mui/material';

function Toast({
  severity = 'error',
  message = 'default',
  onClose = () => { },
}) {
  setTimeout(() => {
    onClose();
  }, 3000);

  return (
    <Alert
      sx={{
        width: '300px',
        position: 'fixed',
        left: 10,
        bottom: 10,
      }}
      severity={severity}
      onClose={onClose}
    >
      <AlertTitle sx={{
        textTransform: 'capitalize',
      }}
      >
        {severity}
      </AlertTitle>
      {message}
    </Alert>
  );
}

export default Toast;
