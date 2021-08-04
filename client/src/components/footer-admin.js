import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.linkedin.com/in/jo%C3%A3o-pereira-11496872/" target="blank">
        João Pereira
        {' '}
      </Link>
      {new Date().getFullYear()}
      
    </Typography>
    );
  }