import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import ChallengeCreationStepper from './Stepper';

const styles = {
  header: { display: 'flex', justifyContent: 'space-between' },
};

const ResponsiveDialog = ({ onClose, fullScreen, classes }) => (
  <Dialog open fullScreen={fullScreen} onClose={onClose}>
    <div className={classes.header}>
      <DialogTitle>New Challenge</DialogTitle>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </div>
    <DialogContent>
      <ChallengeCreationStepper
        onSubmit={newChallenge => {
          console.log(`Create new challenge:`);
          console.log(newChallenge);
        }}
      />
    </DialogContent>
  </Dialog>
);

ResponsiveDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(withStyles(styles)(ResponsiveDialog));
