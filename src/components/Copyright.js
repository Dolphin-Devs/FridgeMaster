import * as React from 'react';
import { Typography } from '@mui/material';

function Copyright(props){
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
          {'© '}
          {new Date().getFullYear()}{' '}
          {'Dolphin Devs. All rights reserved.'}
        </Typography>
      );
}

export default Copyright;