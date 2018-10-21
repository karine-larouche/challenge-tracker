import { getChallenges } from '../firebase/firestore';

const challengesModel = {
  state: {
    isLoading: false,
    hasError: false,
    challenges: {},
  },
  reducers: {
    fetchChallenges: state => ({
      ...state,
      isLoading: true,
      hasError: false,
      challenges: {},
    }),
    setChallenges: (state, challenges) => ({
      ...state,
      isLoading: false,
      challenges,
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
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
  }),
};

export default challengesModel;
