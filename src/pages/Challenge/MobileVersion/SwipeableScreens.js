import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

const styles = theme => ({
  content: { flex: 1, overflow: 'hidden' },
  swipableContainer: { height: '100%' },
  swipableView: { height: '100%', padding: theme.spacing.grid },
  scollable: { overflow: 'auto' },
  bottomNavigation: { zIndex: 1 },
});

class SwipeableScreens extends React.Component {
  state = { value: this.props.defaultIndex };

  setValue = value => this.setState({ value });

  render() {
    const { screens, theme, classes } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <div className={classes.content}>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={this.setValue}
            containerStyle={{ height: '100%' }}
            className={classes.swipableContainer}
          >
            {screens.map(screen => (
              <div
                className={
                  classes.swipableView +
                  (screen.scrollable ? ` ${classes.scollable}` : '')
                }
              >
                {screen.content}
              </div>
            ))}
          </SwipeableViews>
        </div>
        <Paper className={classes.bottomNavigation}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => this.setValue(newValue)}
          >
            {screens.map(({ icon }) => <BottomNavigationAction icon={icon} />)}
          </BottomNavigation>
        </Paper>
      </Fragment>
    );
  }
}

SwipeableScreens.propTypes = {
  defaultIndex: PropTypes.number,
  screens: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      content: PropTypes.node.isRequired,
      scrollable: PropTypes.bool,
    }),
  ).isRequired,
};

SwipeableScreens.defaultProps = {
  defaultIndex: 0,
};

export default withStyles(styles, { withTheme: true })(SwipeableScreens);
