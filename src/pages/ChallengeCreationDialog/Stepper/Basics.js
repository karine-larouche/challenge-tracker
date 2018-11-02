import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': { marginBottom: theme.spacing.unit * 2 },
  },
});

class Basics extends Component {
  setValue = (field, value) => {
    const values = Object.assign(this.props.values, { [field]: value });
    const complete = Boolean(values.name);
    this.props.setValues(values, complete);
  };

  render() {
    const { values, classes } = this.props;
    return (
      <div className={classes.container}>
        <TextField
          label="Name"
          required
          value={values.name || ''}
          onChange={event => this.setValue('name', event.target.value)}
        />
        <TextField
          label="Description"
          multiline
          rowsMax="4"
          value={values.description || ''}
          onChange={event => this.setValue('description', event.target.value)}
        />
      </div>
    );
  }
}

Basics.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  setValues: PropTypes.func.isRequired,
};

export default withStyles(styles)(Basics);
