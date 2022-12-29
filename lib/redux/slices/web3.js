import { createSlice } from "@reduxjs/toolkit";
import { supportedChains } from "../../configs/networks.js";

const web3Slice = createSlice({
  name: `web3`,
  initialState: {
    chainId: supportedChains[0],
  },
  reducers: {
    setupNetwork: (state, action) => {
      state.chainId = action.payload.chainId;
    },
  },
});

export const selectors = {
  selectChainId: (state) => state.web3.chainId,
};

export const actions = web3Slice.actions;

export default web3Slice;
