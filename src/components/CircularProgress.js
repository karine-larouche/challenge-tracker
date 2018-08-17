import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 24,
  },
});

const Progress = ({ classes }) => (
  <div className={classes.container}>
    <Fade in style={{ transitionDelay: '250ms' }} unmountOnExit>
      <CircularProgress />
    </Fade>
  </div>
);

export default withStyles(styles)(Progress);
