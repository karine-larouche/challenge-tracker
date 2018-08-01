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
  effects: {
    fetchChallenges(payload, state) {
      getChallenges(
        state.auth.userId,
        challenges => this.setChallenges(challenges),
        error => {
          console.log(error);
          this.setError();
        },
      );
    },
  },
};

export default challengesModel;
