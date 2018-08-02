import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { propTypesChallenge } from '../../utils/propTypes';
import ChallengeCard from './ChallengeCard';
import ChallengePlaceholder from './ChallengePlaceholder';

const cardMaxWidth = 320;
const spacing = 16;
const itemsPerLine = { xs: 1, sm: 2, md: 3, lg: 4 };

const rootMaxWidth = theme =>
  Object.assign(
    {},
    ...['xs', 'sm', 'md', 'lg'].map(bp => ({
      [theme.breakpoints.up(bp)]: {
        maxWidth:
          itemsPerLine[bp] * cardMaxWidth + (itemsPerLine[bp] + 1) * spacing,
      },
    })),
  );

const styles = theme => ({
  root: {
    margin: 'auto',
    padding: `32px ${spacing}px`,
    display: 'flex',
    alignItems: 'center',
    ...rootMaxWidth(theme),
  },
});

const ChallengeList = ({
  challenges,
  onViewChallengeDetails,
  onAddNewChallenge,
  classes,
}) => (
  <div className={classes.root}>
    <Grid container spacing={spacing}>
      {challenges.map(challenge => (
        <Grid item key={challenge.id} xs={12} sm={6} md={4} lg={3}>
          <ChallengeCard
            challenge={challenge}
            onClick={onViewChallengeDetails}
          />
        </Grid>
      ))}
      <Grid item key="add" xs={12} sm={6} md={4} lg={3}>
        <ChallengePlaceholder onClick={onAddNewChallenge} />
      </Grid>
    </Grid>
  </div>
);

ChallengeList.propTypes = {
  challenges: PropTypes.arrayOf(propTypesChallenge).isRequired,
  onViewChallengeDetails: PropTypes.func.isRequired,
  onAddNewChallenge: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChallengeList);
