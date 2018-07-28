import { getChallenge } from '../firebase/firestore';

const challengeModel = {
  state: {
    isLoading: false,
    hasError: false,
    challenge: {},
  },
  reducers: {
    fetchChallenge: state => ({
      ...state,
      isLoading: true,
      hasError: false,
      challenge: {},
    }),
    setChallenge: (state, challenge) => ({
      ...state,
      isLoading: false,
      challenge,
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
  },
  effects: {
    async fetchChallenge(challengeId) {
      try {
        const challenge = await getChallenge(challengeId);
        this.setChallenge(challenge);
      } catch (error) {
        this.setError();
      }
    },
  },
};

export default challengeModel;
