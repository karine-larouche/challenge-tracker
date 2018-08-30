import PropTypes from 'prop-types';

export const propTypesChallenge = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object,
});

export const propTypesEntry = PropTypes.shape({
  id: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  note: PropTypes.string,
});

export const propTypesParticipant = PropTypes.shape({
  avatarColor: PropTypes.string,
  avatarInitials: PropTypes.string.isRequired,
});
