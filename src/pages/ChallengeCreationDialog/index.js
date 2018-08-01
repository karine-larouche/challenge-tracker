import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import ChallengeCreationStepper from './Stepper';

const styles = {
  header: { display: 'flex', justifyContent: 'space-between' },
};

class ResponsiveDialog extends Component {
  componentDidMount = () => {
    this.props.clear();
  };

  render = () => {
    const {
      onSubmit,
      onClose,
      isSubmitting,
      hasError,
      fullScreen,
      history,
      classes,
    } = this.props;
    return (
      <Dialog open fullScreen={fullScreen} onClose={onClose}>
        <div className={classes.header}>
          <DialogTitle>New Challenge</DialogTitle>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <ChallengeCreationStepper
            onSubmit={challenge => onSubmit({ challenge, history })}
          />
        </DialogContent>
        {isSubmitting && <LinearProgress color="secondary" />}
        {hasError && (
          <Typography color="error">
            An error occurred, please try again.
          </Typography>
        )}
      </Dialog>
    );
  };
}

ResponsiveDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  clear: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

const mapState = state => ({
  isSubmitting: state.newChallenge.isSubmitting,
  hasError: state.newChallenge.hasError,
});

const mapDispatch = state => ({
  onSubmit: state.newChallenge.submitNewChallenge,
  clear: state.newChallenge.clear,
});

export default compose(
  withMobileDialog(),
  withRouter,
  withStyles(styles),
  connect(
    mapState,
    mapDispatch,
  ),
)(ResponsiveDialog);
