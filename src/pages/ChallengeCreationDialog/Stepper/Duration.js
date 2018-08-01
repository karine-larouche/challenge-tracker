import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import DatePicker from 'material-ui-pickers/DatePicker';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  margin: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Duration extends Component {
  setValue = (field, value) => {
    const values = Object.assign(this.props.values, { [field]: value });
    const complete = this.complete(values) && !this.dateError(values);
    this.props.setValues(values, complete);
  };

  complete = values =>
    Boolean(values.startDate && (values.onGoing || values.endDate));

  dateError = values => !values.onGoing && values.startDate > values.endDate;

  render = () => {
    const { values, classes } = this.props;
    return (
      <div className={classes.container}>
        <FormControlLabel
          control={
            <Switch
              checked={values.onGoing}
              onChange={(event, checked) => this.setValue('onGoing', checked)}
              color="primary"
            />
          }
          label="Ongoing challenge"
        />
        <DatePicker
          className={classes.margin}
          label="Start date"
          required
          autoOk
          value={values.startDate || null}
          onChange={date => this.setValue('startDate', date)}
        />
        {values.onGoing || (
          <DatePicker
            className={classes.margin}
            label="End date"
            required
            autoOk
            value={values.endDate || null}
            onChange={date => this.setValue('endDate', date)}
          />
        )}
        {this.complete(values) &&
          this.dateError(values) && (
            <Typography color="error">
              The end date cannot be before the start date
            </Typography>
          )}
      </div>
    );
  };
}

Duration.propTypes = {
  values: PropTypes.shape({
    onGoing: PropTypes.bool,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  }).isRequired,
  setValues: PropTypes.func.isRequired,
};

export default withStyles(styles)(Duration);
