import format from 'date-fns/format';
import { getEntries } from '../firebase/firestore';

const groupByDate = entries =>
  entries.reduce((grouped, entry) => {
    const day = format(entry.time, 'YYYY-MM-DD');
    // eslint-disable-next-line no-param-reassign
    grouped[day] = grouped[day] || [];
    grouped[day].push(entry);
    return grouped;
  }, {});

const entriesModel = {
  state: {
    entries: {},
    isLoading: false,
    hasError: false,
    unsubscribe: undefined,
  },
  reducers: {
    getEntries: state => ({
      ...state,
      entries: {},
      isLoading: true,
      hasError: false,
    }),
    setEntries: (state, entries, unsubscribe) => ({
      ...state,
      isLoading: false,
      entries,
      unsubscribe,
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
  },
  effects: {
    async getEntries(challengeId, state) {
      if (state.entries.unsubscribe) {
        state.entries.unsubscribe();
      }
      const unsubscribe = getEntries(
        challengeId,
        entries => this.setEntries(groupByDate(entries), unsubscribe),
        error => {
          console.log(error);
          this.setError();
        },
      );
    },
  },
};

export default entriesModel;
