import { getChallenges } from '../firebase/firestore';

const challengesModel = {
  state: {
    isLoading: false,
    hasError: false,
    challenges: {},
    currentChallengeId: undefined,
    currentChallenge: undefined,
  },
  reducers: {
    fetchChallenges: state => ({
      ...state,
      isLoading: true,
      hasError: false,
      challenges: {},
      currentChallenge: undefined,
    }),
    setChallenges: (state, challenges) => ({
      ...state,
      isLoading: false,
      challenges,
      currentChallenge: challenges[state.currentChallengeId],
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
    setCurrentChallengeId: (state, id) => ({
      ...state,
      currentChallengeId: id,
      currentChallenge: state.challenges[id],
    }),
  },
  effects: dispatch => ({
    fetchChallenges(payload, state) {
      getChallenges(
        state.auth.userId,
        challenges => this.setChallenges(challenges),
        error => {
          console.log(error);
          this.setError();
          dispatch.error.setGlobalError(error);
        },
      );
    },
    setCurrentChallengeId(id) {
      dispatch.entries.getEntries(id);
      dispatch.participants.getParticipants(id);
    },
  }),
};

export default challengesModel;
