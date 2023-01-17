import { createSlice } from "@reduxjs/toolkit";
import { supportedChains } from "../../configs/networks.js";

const web3Slice = createSlice({
  name: `web3`,
  initialState: {
    chainId: supportedChains[0],
    showWeb3Login: false,
  },
  reducers: {
    setupNetwork: (state, action) => {
      state.chainId = action.payload;
    },
    setShowWeb3Login: (state, action) => {
      state.showWeb3Login = action.payload;
    },
  },
});

export const selectors = {
  selectChainId: (state) => state.web3.chainId,
  selectShowWeb3Login: (state) => state.web3.showWeb3Login,
};

export const actions = web3Slice.actions;

export default web3Slice;
