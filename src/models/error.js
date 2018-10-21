const errorModel = {
  state: {
    globalError: undefined,
  },
  reducers: {
    setGlobalError: (state, error) => ({
      ...state,
      globalError: error,
    }),
  },
};

export default errorModel;
