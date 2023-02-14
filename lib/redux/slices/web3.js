import { createSlice } from "@reduxjs/toolkit";
import { supportedChains } from "../../configs/networks.js";

const web3Slice = createSlice({
  name: `web3`,
  initialState: {
    chainId: supportedChains[0],
    modals: {
      login: {
        show: false,
      },
      signMessage: {
        show: false,
      },
    },
  },
  reducers: {
    setupNetwork: (state, action) => {
      state.chainId = action.payload;
    },
    setLoginModal: (state, action) => {
      state.modals.login = action.payload;
    },
    setSignMessageModal: (state, action) => {
      state.modals.signMessage = action.payload;
    },
  },
});

export const selectors = {
  selectChainId: (state) => state.web3.chainId,
  selectLoginModal: (state) => state.web3.modals.login,
  selectSignMessageModal: (state) => state.web3.modals.signMessage,
};

export const actions = web3Slice.actions;

export default web3Slice;
