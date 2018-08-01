import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { dateRange, dateFormat } from '../../utils/dateUtils';
import LoadingError from '../../components/LoadingError';

const styles = () => ({
  root: { width: 300 },
  bold: { fontWeight: 700 },
});

const Description = ({ challenge, isLoading, hasError, classes }) => (
  <div className={classes.root}>
    <LoadingError isLoading={isLoading} hasError={hasError}>
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
    </LoadingError>
  </div>
);

Description.propTypes = {
  challenge: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

Description.defaultProps = {
  challenge: {},
};

export default withStyles(styles)(Description);
