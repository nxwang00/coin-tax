import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  error: {},
};

const appsettingSlice = createSlice({
  name: "appsetting",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.account = action.payload.account;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const { setAccount, setError } = appsettingSlice.actions;

export default appsettingSlice.reducer;
