import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { CHALLENGES } from '../../routes';
import AppBar from '../../components/AppBar';
import Description from './Description';
import Entries from './Entries';

const styles = theme => ({
  page: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& > *': { margin: theme.spacing.unit * 4 },
  },
});

class Challenge extends Component {
  componentDidMount = () => {
    this.props.getEntries(this.props.match.params.id);
  };

  render = () => {
    const {
      challenges,
      isLoadingChallenges,
      hasErrorChallenges,
      entries,
      isLoadingEntries,
      hasErrorEntries,
      addEntry,
      history,
      match,
      classes,
    } = this.props;
    return (
      <Fragment>
        <AppBar
          leftComponent={
            <Button
              color="inherit"
              onClick={() => history.push(CHALLENGES.path)}
            >
              Back to list
            </Button>
          }
        />
        <div className={classes.page}>
          <Description
            challenge={challenges[match.params.id]}
            isLoading={isLoadingChallenges}
            hasError={hasErrorChallenges}
          />
          <Entries
            entries={entries}
            isLoading={isLoadingEntries}
            hasError={hasErrorEntries}
            onAdd={entry => addEntry({ challengeId: match.params.id, entry })}
          />
        </div>
      </Fragment>
    );
  };
}

Challenge.propTypes = {
  challenges: PropTypes.object.isRequired,
  isLoadingChallenges: PropTypes.bool.isRequired,
  hasErrorChallenges: PropTypes.bool.isRequired,
  entries: PropTypes.object.isRequired,
  isLoadingEntries: PropTypes.bool.isRequired,
  hasErrorEntries: PropTypes.bool.isRequired,
  getEntries: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
};

const mapState = state => ({
  challenges: state.challenges.challenges,
  isLoadingChallenges: state.challenges.isLoading,
  hasErrorChallenges: state.challenges.hasError,
  entries: state.entries.entries,
  isLoadingEntries: state.entries.isLoading,
  hasErrorEntries: state.entries.hasError,
});

const mapDispatch = state => ({
  getEntries: state.entries.getEntries,
  addEntry: state.entries.addEntry,
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch,
  )(Challenge),
);
