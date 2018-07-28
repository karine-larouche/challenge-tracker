import { saveNewChallenge } from '../firebase/firestore';
import { CHALLENGE } from '../routes';

const newChallengeModel = {
  state: {
    isSubmitting: false,
    hasError: false,
  },
  reducers: {
    submitNewChallenge: state => ({
      ...state,
      isSubmitting: true,
      hasError: false,
    }),
    onSuccess: state => ({
      ...state,
      isSubmitting: false,
    }),
    setError: state => ({
      ...state,
      isSubmitting: false,
      hasError: true,
    }),
    clear: state => ({
      ...state,
      isSubmitting: false,
      hasError: false,
    }),
  },
  effects: {
    async submitNewChallenge({ challenge, history }, state) {
      try {
        const newChallenge = challenge;
        if (challenge.onGoing) {
          delete newChallenge.endDate;
        }
        delete newChallenge.onGoing;
        const { id } = await saveNewChallenge(state.auth.userId, newChallenge);
        history.push(CHALLENGE.path.replace(':id', id));
        this.onSuccess();
      } catch (error) {
        this.setError();
      }
    },
  },
};

export default newChallengeModel;
