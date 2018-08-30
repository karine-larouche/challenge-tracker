import { getUser, saveUser } from '../firebase/firestore';

const userModel = {
  state: {
    isLoading: false,
    hasError: false,
    user: {},
  },
  reducers: {
    fetchOrInitialize: state => ({
      ...state,
      isLoading: true,
      hasError: false,
      user: {},
    }),
    setUser: (state, user) => ({
      ...state,
      isLoading: false,
      user,
    }),
    setError: state => ({
      ...state,
      isLoading: false,
      hasError: true,
    }),
  },
  effects: {
    async fetchOrInitialize(payload) {
      const user = await getUser(payload.uid);
      if (user.exists) {
        this.setUser(user.data());
      } else {
        const newUser = {
          email: payload.email,
          avatarInitials: payload.email.charAt(0).toUpperCase(),
        };
        await saveUser(payload.uid, newUser);
        this.setUser(newUser);
      }
    },
  },
};

export default userModel;
