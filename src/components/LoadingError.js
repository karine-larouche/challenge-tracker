import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const LoadingError = ({ isLoading, hasError, children }) =>
  isLoading ? (
    <Typography>Loading...</Typography>
  ) : hasError ? (
    <Typography>An error occurred...</Typography>
  ) : (
    <Fragment>{children}</Fragment>
  );

LoadingError.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default LoadingError;
