import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  flex: {
    flexGrow: 1,
  },
};

const AppBar = ({ leftComponent, signOut, classes }) => (
  <MuiAppBar position="static">
    <Toolbar>
      <div className={classes.flex}>{leftComponent}</div>
      <Button color="inherit" onClick={signOut}>
        Sign out
      </Button>
    </Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  leftComponent: PropTypes.node,
  signOut: PropTypes.func.isRequired,
};

AppBar.defaultProps = {
  leftComponent: undefined,
};

const mapDispatch = dispatch => ({
  signOut: dispatch.auth.signOut,
});

export default connect(
  null,
  mapDispatch,
)(withStyles(styles)(AppBar));
