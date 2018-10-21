import { getParticipants } from '../firebase/firestore';

const participantsModel = {
  state: {
    participants: {},
    isLoading: false,
    hasError: false,
    unsubscribe: undefined,
  },
  reducers: {
    getParticipants: state => ({
      ...state,
      participants: {},
      isLoading: true,
      hasError: false,
    }),
    setParticipants: (state, participants, unsubscribe) => ({
      ...state,
      isLoading: false,
      participants: participants || {},
      unsubscribe,
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
  },
  effects: dispatch => ({
    getParticipants(challengeId, state) {
      if (state.participants.unsubscribe) {
        state.participants.unsubscribe();
      }
      const unsubscribe = getParticipants(
        challengeId,
        participants => this.setParticipants(participants, unsubscribe),
        error => {
          console.log(error);
          this.setError();
          dispatch.error.setGlobalError(error);
        },
      );
    },
  }),
};

export default participantsModel;
