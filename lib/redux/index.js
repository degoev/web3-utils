import web3Slice, { selectors, actions } from "./slices/web3.js";

const redux = {
  slice: web3Slice,
  selectors,
  actions,
};

export default redux;
