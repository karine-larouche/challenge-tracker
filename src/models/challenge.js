import format from 'date-fns/format';
import { getChallenge, getEntries } from '../firebase/firestore';

const groupByDate = entries =>
  entries.reduce((grouped, entry) => {
    const day = format(entry.time, 'YYYY-MM-DD');
    // eslint-disable-next-line no-param-reassign
    grouped[day] = grouped[day] || [];
    grouped[day].push(entry);
    return grouped;
  }, {});

const challengeModel = {
  state: {
    isLoading: false,
    hasError: false,
    challenge: {},
    entries: {},
  },
  reducers: {
    fetchChallenge: state => ({
      ...state,
      isLoading: true,
      hasError: false,
      challenge: {},
    }),
    setChallenge: (state, challenge, entries) => ({
      ...state,
      isLoading: false,
      challenge,
      entries,
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
        const entries = await getEntries(challengeId);
        this.setChallenge(challenge, groupByDate(entries));
      } catch (error) {
        console.log(error);
        this.setError();
      }
    },
  },
};

export default challengeModel;
