import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Add from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';

const styles = () => ({
  card: { height: 128, display: 'flex' },
  paper: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
  contentContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    '&:last-child': {
      padding: 0,
    },
  },
});

const ChallengePlaceholder = ({ onClick, classes }) => (
  <Card
    onClick={onClick}
    elevation={0}
    className={classes.card}
    classes={{ root: classes.paper }}
  >
    <CardContent className={classes.contentContainer}>
      <Add style={{ fontSize: 64, color: 'rgba(0, 0, 0, 0.3)' }} />
    </CardContent>
  </Card>
);

ChallengePlaceholder.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChallengePlaceholder);
