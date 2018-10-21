import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

const styles = theme => ({
  content: { backgroundColor: theme.palette.error.dark },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
});

const ErrorHandler = ({ globalError, children, classes }) => (
  <Fragment>
    {children}
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={Boolean(globalError)}
    >
      <SnackbarContent
        className={classes.content}
        message={
          <span className={classes.message}>
            <ErrorIcon className={classes.icon} />
            {'An error occurred, please refresh the page'}
          </span>
        }
      />
    </Snackbar>
  </Fragment>
);

ErrorHandler.propTypes = {
  globalError: PropTypes.object,
  children: PropTypes.node.isRequired,
};

ErrorHandler.defaultProps = {
  globalError: undefined,
};

const mapState = state => ({
  globalError: state.error.globalError,
});

export default withStyles(styles)(connect(mapState)(ErrorHandler));
