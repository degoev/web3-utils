import connectorsByName, {
  getLibrary,
  connectorLocalStorageKey,
} from "./connectors.js";
import { getContract } from "./utils.js";
import {
  signMessage,
  signTypedMessage,
  registerToken,
  setupNetwork,
} from "./wallet-actions.js";
import {
  supportedChains,
  rpcUrlByChains,
  ChainIds,
} from "./configs/networks.js";
import walletConfigs from "./configs/wallets.js";
import hooks from "./hooks/index.js";
import redux from "./redux/index.js";
const { useWeb3Auth } = hooks;

const web3 = {
  connectors: {
    connectorsByName,
    getLibrary,
    connectorLocalStorageKey,
  },
  utils: {
    getContract,
  },
  walletActions: {
    setupNetwork,
    signMessage,
    signTypedMessage,
    registerToken,
  },
  configs: {
    supportedChains,
    rpcUrlByChains,
    ChainIds,
    wallets: walletConfigs,
  },
  hooks: { useWeb3Auth },
  redux,
};

export default web3;
