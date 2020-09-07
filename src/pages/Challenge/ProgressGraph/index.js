import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMonths, isSameMonth, subMonths } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import IconPrevious from '@material-ui/icons/ArrowLeft';
import IconNext from '@material-ui/icons/ArrowRight';
import { propTypesChallenge } from '../../../utils/propTypes';
import { isThisMonth, monthFormat, now } from '../../../utils/dateUtils';
import GraphCard from './GraphCard';

const styles = theme => ({
  monthPicker: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit,
  },
  arrowButton: { padding: 8 },
  progressGraphSection: {
    [theme.breakpoints.up('sm')]: { height: 400 },
    [theme.breakpoints.down('xs')]: { height: '100%' },
    display: 'flex',
    flexDirection: 'column',
  },
  card: { flex: 1 },
});

class ProgressGraphSection extends Component {
  state = {
    displayedMonth: now(),
  };

  onPrevious = () =>
    this.setState(prevState => ({
      displayedMonth: subMonths(prevState.displayedMonth, 1),
    }));

  onNext = () =>
    this.setState(prevState => ({
      displayedMonth: addMonths(prevState.displayedMonth, 1),
    }));

  render() {
    const { currentChallenge, entries, classes } = this.props;
    const { displayedMonth } = this.state;
    const entryArray = Object.entries(entries);

    if (!currentChallenge || entryArray.length === 0) {
      return null;
    }

    const firstEntryDate = new Date(entryArray[entryArray.length - 1][0]);

    const monthEntries = [0, 1, 2].map(i =>
      entryArray.filter(([day]) =>
        isSameMonth(new Date(day), subMonths(displayedMonth, i)),
      ),
    );

    return (
      <div className={classes.progressGraphSection}>
        <div className={classes.monthPicker}>
          <IconButton
            onClick={this.onPrevious}
            disabled={isSameMonth(firstEntryDate, displayedMonth)}
            aria-label="View previous month"
            className={classes.arrowButton}
          >
            <IconPrevious />
          </IconButton>
          <Typography>{monthFormat(displayedMonth)}</Typography>
          <IconButton
            onClick={this.onNext}
            disabled={isThisMonth(displayedMonth)}
            aria-label="View next month"
            className={classes.arrowButton}
          >
            <IconNext />
          </IconButton>
        </div>
        <GraphCard monthEntries={monthEntries} className={classes.card} />
      </div>
    );
  }
}

ProgressGraphSection.propTypes = {
  entries: PropTypes.object.isRequired,
  currentChallenge: propTypesChallenge,
};

ProgressGraphSection.defaultProps = {
  currentChallenge: undefined,
};

const mapState = state => ({
  entries: state.entries.entries,
  currentChallenge: state.challenges.currentChallenge,
});

export default withStyles(styles)(connect(mapState)(ProgressGraphSection));
