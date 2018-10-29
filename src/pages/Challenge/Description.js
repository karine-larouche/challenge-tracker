import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { dateRange, dateFormat } from '../../utils/dateUtils';
import { propTypesChallenge } from '../../utils/propTypes';
import LoadingError from '../../components/LoadingError';

const styles = () => ({
  bold: { fontWeight: 700 },
});

const Description = ({ challenge = {}, isLoading, hasError, classes }) => (
  <LoadingError isLoading={isLoading} hasError={hasError}>
    <Typography variant="h6" gutterBottom classes={{ root: classes.bold }}>
      {challenge.name}
    </Typography>
    <Typography variant="subtitle2" color="primary" gutterBottom>
      {challenge.endDate
        ? dateRange(challenge.startDate, challenge.endDate)
        : `From ${dateFormat(challenge.startDate)}`}
    </Typography>
    <Typography variant="body2" color="textSecondary" align="justify">
      {challenge.description}
    </Typography>
  </LoadingError>
);

Description.propTypes = {
  challenge: propTypesChallenge,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};

Description.defaultProps = {
  challenge: undefined,
};

export default withStyles(styles)(Description);
