import { authRef, provider } from '../firebase/initialization';
import { CHALLENGES } from '../routes';

const authModel = {
  state: {
    userId: undefined,
    isAuthenticated: false,
    requestedPath: CHALLENGES.path,
  },
  reducers: {
    setUser: (state, user) => ({
      ...state,
      userId: user ? user.uid : undefined,
      isAuthenticated: Boolean(user),
    }),
    setRequestedPath: (state, requestedPath) => ({
      ...state,
      requestedPath,
    }),
  },
  effects: {
    signIn: async () => {
      try {
        await authRef.signInWithPopup(provider);
      } catch (error) {
        console.log(error);
      }
    },
    signOut: async () => {
      try {
        await authRef.signOut();
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default authModel;
