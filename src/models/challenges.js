import { getChallenges } from '../firebase/firestore';

const challengesModel = {
  state: {
    isLoading: false,
    hasError: false,
    challenges: [],
  },
  reducers: {
    fetchChallenges: state => ({
      ...state,
      isLoading: true,
      hasError: false,
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
    async fetchChallenges(payload, state) {
      try {
        const challenges = await getChallenges(state.auth.userId);
        this.setChallenges(challenges);
      } catch (error) {
        this.setError();
      }
    },
  },
};

export default challengesModel;
