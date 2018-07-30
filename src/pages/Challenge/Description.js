import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { dateRange, dateFormat } from '../../utils/dateUtils';

const styles = () => ({
  root: { maxWidth: 300 },
  bold: { fontWeight: 700 },
});

const Description = ({ challenge, classes }) => (
  <div className={classes.root}>
    <Typography variant="title" gutterBottom classes={{ root: classes.bold }}>
      {challenge.name}
    </Typography>
    <Typography variant="body2" color="primary" gutterBottom>
      {challenge.endDate
        ? dateRange(challenge.startDate, challenge.endDate)
        : `From ${dateFormat(challenge.startDate)}`}
    </Typography>
    <Typography color="textSecondary" align="justify">
      {challenge.description}
    </Typography>
  </div>
);

Description.propTypes = {
  challenge: PropTypes.object.isRequired,
};

export default withStyles(styles)(Description);
