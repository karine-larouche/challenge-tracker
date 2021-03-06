/* eslint-disable no-param-reassign */
import { startOfDay } from 'date-fns';
import { getEntries, saveNewEntry, deleteEntry } from '../firebase/firestore';

const groupByDate = entries =>
  entries.reduce((grouped, entry) => {
    const day = startOfDay(entry.time);
    grouped[day] = grouped[day] || { total: 0, entries: [] };
    grouped[day].entries.push(entry);
    grouped[day].total += entry.quantity;
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
    'challenges/setCurrentChallengeId': state => ({
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
  effects: dispatch => ({
    getEntries(challengeId, state) {
      if (state.entries.unsubscribe) {
        state.entries.unsubscribe();
      }
      const unsubscribe = getEntries(
        challengeId,
        entries => this.setEntries(groupByDate(entries), unsubscribe),
        error => {
          console.log(error);
          this.setError();
          dispatch.error.setGlobalError(error);
        },
      );
    },
    addEntry({ challengeId, entry }, state) {
      saveNewEntry(state.auth.userId, challengeId, entry);
    },
    deleteEntry({ challengeId, entryId }) {
      deleteEntry(challengeId, entryId);
    },
  }),
};

export default entriesModel;
