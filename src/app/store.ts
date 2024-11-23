import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { AccountSliceReducer } from 'zkwasm-minirollup-rpc';
import endpointReducer from "../data/endpoint";
import puppyPartyReducer from "../data/puppy_party/puppy_party";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['acccount/deriveL2Account/fulfilled', "client/sendTransaction/fulfilled", "client/sendTransaction/pending", "client/sendTransaction/rejected"],
        ignoredActionPaths: ['payload.web3','payload.seed', 'payload.injector'],
        ignoredPaths: [
          "acccount/fetchAccount/fulfilled",
          "account.l1Account.web3",
          "endpoint.zkWasmServiceHelper",
          "status.config.latest_server_checksum",
          "account.l2account",
          "puppyParty.properties.player.data.action"
        ],
      },
    }),
  reducer: {
    account: AccountSliceReducer,
    endpoint: endpointReducer,
    puppyParty: puppyPartyReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
