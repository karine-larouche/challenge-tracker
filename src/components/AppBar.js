import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  flex: {
    flexGrow: 1,
  },
};

const AppBar = ({ pageTitle, signOut, classes }) => (
  <MuiAppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        {pageTitle}
      </Typography>
      <Button color="inherit" onClick={signOut}>
        Sign out
      </Button>
    </Toolbar>
  </MuiAppBar>
);

AppBar.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapDispatch = state => ({
  signOut: state.auth.signOut,
});

export default connect(
  null,
  mapDispatch,
)(withStyles(styles)(AppBar));
