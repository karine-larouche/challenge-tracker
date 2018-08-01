import { authRef, provider } from '../firebase/initialization';
import { CHALLENGES } from '../routes';

const authModel = {
  state: {
    userId: undefined,
    isAuthenticated: false,
    requestedPath: CHALLENGES.path,
  },
  reducers: {
    onAuthStateChanged: (state, user) => ({
      ...state,
      userId: user ? user.uid : undefined,
      isAuthenticated: Boolean(user),
    }),
    setRequestedPath: (state, requestedPath) => ({
      ...state,
      requestedPath,
    }),
  },
  effects: dispatch => ({
    signIn: async () => {
      await authRef.signInWithPopup(provider);
    },
    signOut: async () => {
      await authRef.signOut();
    },
    onAuthStateChanged(user) {
      if (user && user.uid) {
        dispatch.challenges.fetchChallenges(user.uid);
      }
    },
  }),
};

export default authModel;
