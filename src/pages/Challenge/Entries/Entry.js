import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import BulletIcon from '@material-ui/icons/Done';
import { timeFormat } from '../../../utils/dateUtils';
import { propTypesEntry, propTypesParticipant } from '../../../utils/propTypes';
import ConfirmDelete from './ConfirmDelete';

const styles = theme => ({
  entry: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing.unit,
  },
  details: { flex: 1 },
  essentials: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  quantity: { marginBottom: -4 },
  delete: { padding: 8 },
});

class Entry extends Component {
  state = {
    hover: false,
    dialogOpen: false,
  };

  onHover = () => this.setState({ hover: true });

  onHoverExit = () => this.setState({ hover: false });

  onDelete = () => this.setState({ dialogOpen: true });

  onCancelDelete = () => this.setState({ hover: false, dialogOpen: false });

  onConfirmDelete = () => {
    this.setState({ dialogOpen: false });
    this.props.onDelete(this.props.entry.id);
  };

  render() {
    const { entry, participant, classes } = this.props;
    const { hover, dialogOpen } = this.state;
    return (
      <div
        className={classes.entry}
        onMouseOver={this.onHover}
        onFocus={this.onHover}
        onMouseLeave={this.onHoverExit}
        onBlur={this.onHoverExit}
      >
        {participant ? (
          <Avatar
            className={classes.avatar}
            style={{ color: '#000', backgroundColor: participant.avatarColor }}
          >
            {participant.avatarInitials}
          </Avatar>
        ) : (
          <Avatar className={classes.avatar}>
            <BulletIcon />
          </Avatar>
        )}
        <div className={classes.details}>
          <div className={classes.essentials}>
            <div>
              <Typography className={classes.quantity} variant="subtitle2">
                {entry.quantity}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {timeFormat(entry.time)}
              </Typography>
            </div>
            {hover && (
              <IconButton className={classes.delete} onClick={this.onDelete}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          <Typography variant="body2" color="textSecondary">
            {entry.note}
          </Typography>
        </div>
        <ConfirmDelete
          open={dialogOpen}
          onClose={this.onCancelDelete}
          onConfirm={this.onConfirmDelete}
        />
      </div>
    );
  }
}

Entry.propTypes = {
  entry: propTypesEntry.isRequired,
  participant: propTypesParticipant,
  onDelete: PropTypes.func.isRequired,
};

Entry.defaultProps = {
  participant: undefined,
};

export default withStyles(styles)(Entry);
