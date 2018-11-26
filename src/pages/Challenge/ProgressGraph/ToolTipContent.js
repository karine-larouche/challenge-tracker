import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: { marginRight: 8 },
});

const ToolTipContent = ({ label, value, total, classes }) => (
  <Fragment>
    <div className={classes.row}>
      <Typography className={classes.label} variant="caption">
        {label}
      </Typography>
      <Typography variant="subtitle2" color="primary">
        {value}
      </Typography>
    </div>
    <div className={classes.row}>
      <Typography className={classes.label} variant="caption">
        Total
      </Typography>
      <Typography variant="subtitle2" color="primary">
        {total}
      </Typography>
    </div>
  </Fragment>
);

ToolTipContent.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default withStyles(styles)(ToolTipContent);
