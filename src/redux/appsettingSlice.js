import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: {},
  accounts: [],
  error: {},
  selectedAccountId: null,
};

const appsettingSlice = createSlice({
  name: "appsetting",
  initialState,
  reducers: {
    setAccount(state, action) {
      state.account = action.payload.account;
    },
    setAccounts(state, action) {
      state.accounts = action.payload.accounts;
    },
    setSelectedAccountId(state, action) {
      state.selectedAccountId = action.payload.selectedAccountId;
    },
    setError(state, action) {
      state.error = action.payload.error;
    },
  },
});

export const { setAccount, setAccounts, setSelectedAccountId, setError } =
  appsettingSlice.actions;

export default appsettingSlice.reducer;
