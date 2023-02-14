import connectorsByName, {
  getLibrary,
  connectorLocalStorageKey,
} from "./connectors.js";
import {
  getContract,
  formatAddress,
  iconFromAddress,
  getExplorerUrl,
} from "./utils.js";
import {
  signMessage,
  signTypedMessage,
  registerToken,
  setupNetwork,
} from "./wallet-actions.js";
import networkConfigs, {
  supportedChains,
  rpcUrlByChains,
  ChainIds,
} from "./configs/networks.js";
import walletConfigs from "./configs/wallets.js";
import hooks from "./hooks/index.js";
import redux from "./redux/index.js";
const { useWeb3Auth } = hooks;

import { authTokensManager } from "./storage";

import components from "./components";

const web3 = {
  connectors: {
    connectorsByName,
    getLibrary,
    connectorLocalStorageKey,
  },
  utils: {
    getContract,
    formatAddress,
    iconFromAddress,
    getExplorerUrl,
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
    networks: networkConfigs,
  },
  hooks: { useWeb3Auth },
  redux,
  components,
  storage: { authTokensManager },
};

export default web3;
