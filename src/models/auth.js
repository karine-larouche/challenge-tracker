import { authRef, provider } from '../firebase';

const authModel = {
  state: { userId: undefined, isAuthenticated: false },
  reducers: {
    setUser: (state, user) => ({
      ...state,
      userId: user ? user.uid : undefined,
      isAuthenticated: Boolean(user),
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
