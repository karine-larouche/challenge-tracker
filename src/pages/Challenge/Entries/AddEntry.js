import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { startOfHour } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DateTimePicker from 'material-ui-pickers/DateTimePicker';
import { now } from '../../../utils/dateUtils';

const styles = theme => ({
  panel: {
    marginBottom: theme.spacing.unit * 2,
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
  panelDetails: {
    flexDirection: 'column',
    '& > *': { flex: 1, display: 'flex' },
  },
  quantity: {
    flex: 1,
    marginRight: theme.spacing.unit * 2,
  },
  time: { flex: 2 },
  note: { flex: 1 },
});

class AddEntry extends Component {
  state = {
    creating: false,
    quantity: '',
    note: '',
  };

  onPanelChange = (event, expanded) => {
    this.setState({ creating: expanded });
    if (expanded) {
      this.setState({ quantity: '', time: startOfHour(now()), note: '' });
    }
  };

  onFieldChange = (field, value) => {
    this.setState({ [field]: value });
  };

  onSubmit = () => {
    const { quantity, time, note } = this.state;
    this.setState({ creating: false });
    const entry = { quantity: Number(quantity), time };
    if (note !== '') {
      entry.note = note;
    }
    this.props.onSubmit(entry);
  };

  complete = () => {
    const { quantity, time } = this.state;
    return quantity > 0 && time;
  };

  render() {
    const { classes } = this.props;
    const { creating, quantity, time, note } = this.state;
    return (
      <ExpansionPanel
        expanded={creating}
        onChange={this.onPanelChange}
        className={classes.panel}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Add entry</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails classes={{ root: classes.panelDetails }}>
          <div>
            <TextField
              className={classes.quantity}
              label="Quantity"
              type="number"
              required
              value={quantity}
              onChange={event =>
                this.onFieldChange('quantity', event.target.value)
              }
              InputLabelProps={{ shrink: true }}
            />
            <DateTimePicker
              className={classes.time}
              label="Date & time"
              required
              disableFuture
              value={time}
              onChange={value => this.onFieldChange('time', value)}
            />
          </div>
          <TextField
            className={classes.note}
            label="Note"
            multiline
            rowsMax="2"
            value={note}
            onChange={event => this.onFieldChange('note', event.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <ExpansionPanelActions>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.complete()}
              onClick={this.onSubmit}
            >
              Add
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

AddEntry.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(AddEntry);
