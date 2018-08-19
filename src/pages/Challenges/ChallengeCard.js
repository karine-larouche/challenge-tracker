import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { propTypesChallenge } from '../../utils/propTypes';
import { mix } from '../../utils/colorUtils';

const styles = theme => ({
  card: {
    height: 128,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: mix('#000000', theme.palette.background.paper, 2),
    },
  },
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
