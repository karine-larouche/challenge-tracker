import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { CHALLENGES } from '../../routes';
import AppBar from '../../components/AppBar';
import Description from './Description';
import Entries from './Entries';
import Calendar from './Calendar';
import ProgressGraph from './ProgressGraph';

const styles = theme => ({
  container: { margin: theme.spacing.grid },
});

const ChallengePageDesktop = ({ history, classes, theme }) => (
  <Fragment>
    <AppBar
      leftComponent={
        <Button color="inherit" onClick={() => history.push(CHALLENGES.path)}>
          Back to list
        </Button>
      }
    />
    <div className={classes.container}>
      <Grid container spacing={theme.spacing.grid} justify="center">
        <Grid item xs={12} sm={6} md={8} lg={6}>
          <Grid container spacing={theme.spacing.grid}>
            <Grid item xs={12} md={8}>
              <Description />
            </Grid>
            <Grid item xs={12}>
              <Calendar />
            </Grid>
            <Grid item xs={12}>
              <ProgressGraph />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Entries />
        </Grid>
      </Grid>
    </div>
  </Fragment>
);

ChallengePageDesktop.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(ChallengePageDesktop);
