import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import CalendarIcon from '@material-ui/icons/DateRange';
import GraphIcon from '@material-ui/icons/TrendingUp';
import EntriesIcon from '@material-ui/icons/List';
import Button from '@material-ui/core/Button';
import { CHALLENGES } from '../../../routes';
import AppBar from '../../../components/AppBar';
import ProgressGraph from '../ProgressGraph';
import Calendar from '../Calendar';
import Entries from '../Entries';
import Description from '../Description';
import SwipeableScreens from './SwipeableScreens';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    overflow: 'hidden',
  },
});

const screens = [
  { icon: <DescriptionIcon />, content: <Description />, scrollable: true },
  { icon: <GraphIcon />, content: <ProgressGraph /> },
  { icon: <CalendarIcon />, content: <Calendar />, scrollable: true },
  { icon: <EntriesIcon />, content: <Entries />, scrollable: true },
];

const ChallengePageMobile = ({ history, classes }) => (
  <div className={classes.root} id="debug-root">
    <AppBar
      leftComponent={
        <Button color="inherit" onClick={() => history.push(CHALLENGES.path)}>
          Back to list
        </Button>
      }
    />
    <SwipeableScreens screens={screens} defaultIndex={3} />
  </div>
);

ChallengePageMobile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChallengePageMobile);
