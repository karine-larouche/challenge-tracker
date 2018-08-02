import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { propTypesChallenge } from '../../utils/propTypes';

const styles = () => ({
  card: { height: 128 },
});

const ChallengeCard = ({ challenge, onClick, classes }) => (
  <Card className={classes.card} onClick={() => onClick(challenge.id)}>
    <CardContent>
      <Typography noWrap variant="title">
        {challenge.name}
      </Typography>
    </CardContent>
  </Card>
);

ChallengeCard.propTypes = {
  challenge: propTypesChallenge.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChallengeCard);
