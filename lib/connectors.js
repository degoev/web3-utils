import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

import { rpcUrlByChains, supportedChains } from "./configs/networks.js";

const injected = new InjectedConnector({
  supportedChainIds: supportedChains,
});

const POLLING_INTERVAL = 12000;
const walletConnect = new WalletConnectConnector({
  rpc: rpcUrlByChains,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

const connectorsByName = {
  injected: injected,
  walletConnect: walletConnect,
};

export default connectorsByName;

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const connectorLocalStorageKey = `connectorId`;
