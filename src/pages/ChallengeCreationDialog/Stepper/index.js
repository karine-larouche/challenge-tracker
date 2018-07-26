import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Basics from './Basics';
import Duration from './Duration';
import TeamMates from './TeamMates';

const styles = theme => ({
  content: {
    width: 300,
    minHeight: 200,
    margin: 48,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 4,
  },
});

const stepLabels = ['Basics', 'Duration', 'Team mates'];

const stepContentComponents = [Basics, Duration, TeamMates];

class ChallengeCreationStepper extends React.Component {
  state = {
    activeStep: 0,
    values: stepLabels.map(() => ({})),
    completed: stepLabels.map(() => false),
  };

  setStepValues = (stepValues, isStepComplete) => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const values = [...this.state.values];
    values[this.state.activeStep] = stepValues;
    // eslint-disable-next-line react/no-access-state-in-setstate
    const completed = [...this.state.completed];
    completed[this.state.activeStep] = isStepComplete;
    this.setState({ values, completed });
  };

  totalSteps = () => stepLabels.length;

  handleNext = () => {
    if (this.isLastStep()) {
      this.props.onSubmit(Object.assign({}, ...this.state.values));
    } else {
      this.setState(state => ({
        activeStep: state.activeStep + 1,
      }));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  isStepComplete = step => this.state.completed[step];

  isLastStep = () => this.state.activeStep === this.totalSteps() - 1;

  render = () => {
    const { classes } = this.props;
    const { activeStep, values } = this.state;

    return (
      <Fragment>
        <Stepper activeStep={activeStep}>
          {stepLabels.map((label, index) => (
            <Step key={label}>
              <StepLabel completed={this.isStepComplete(index)}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className={classes.content}>
          {React.createElement(stepContentComponents[activeStep], {
            values: values[activeStep],
            setValues: this.setStepValues,
          })}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            disabled={!this.isStepComplete(activeStep)}
            onClick={this.handleNext}
          >
            {this.isLastStep() ? 'Submit' : 'Next'}
          </Button>
          {activeStep !== 0 && <Button onClick={this.handleBack}>Back</Button>}
        </div>
      </Fragment>
    );
  };
}

ChallengeCreationStepper.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ChallengeCreationStepper);
