import { hexValue } from "ethers/lib/utils";

export const ChainIds = {
  LOCAL: 31337,
  ETH: 1,
  ROPSTEN: 3,
  GOERLI: 5,
  OPTIMISM: 10,
  BSC: 56,
  BSC_T: 97,
  MUMBAI: 80001,
  MATIC: 137,
};

const networkConfigs = {
  [ChainIds.ETH]: {
    chainId: hexValue(ChainIds.ETH),
    chainName: `Ethereum Mainnet`,
    nativeCurrency: {
      name: `ETH`,
      symbol: `eth`,
      decimals: 18,
    },
    rpcUrls: [`https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`],
    blockExplorerUrls: [`https://etherscan.io`],
    trustWalletUid: `ethereum`,
    displayName: `Ethereum`,
  },
  [ChainIds.ROPSTEN]: {
    chainId: hexValue(ChainIds.ROPSTEN),
    chainName: `Ropsten`,
    nativeCurrency: {
      name: `ETH`,
      symbol: `eth`,
      decimals: 18,
    },
    rpcUrls: [
      `https://ropsten.infura.io/v3/9aa3d95b3bc440fa88raea12eaa4456161`,
    ],
    blockExplorerUrls: [`https://ropsten.etherscan.io`],
    trustWalletUid: `ethereum`,
    displayName: `Ropsten`,
  },
  [ChainIds.GOERLI]: {
    chainId: hexValue(ChainIds.GOERLI),
    chainName: `Goerli Test Network`,
    nativeCurrency: {
      name: `gETH`,
      symbol: `geth`,
      decimals: 18,
    },
    rpcUrls: [`https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`],
    blockExplorerUrls: [`https://goerli.etherscan.io`],
    trustWalletUid: `ethereum`,
    displayName: `Goerli`,
  },
  [ChainIds.OPTIMISM]: {
    chainId: hexValue(ChainIds.OPTIMISM),
    chainName: `Optimism`,
    nativeCurrency: {
      name: `OETH`,
      symbol: `oeth`,
      decimals: 18,
    },
    rpcUrls: [`https://mainnet.optimism.io/`],
    blockExplorerUrls: [`https://optimistic.etherscan.io`],
    trustWalletUid: `ethereum`,
    displayName: `Optimism`,
  },
  [ChainIds.MATIC]: {
    chainId: hexValue(ChainIds.MATIC),
    chainName: `Polygon Mainnet`,
    nativeCurrency: {
      name: `MATIC`,
      symbol: `matic`,
      decimals: 18,
    },
    rpcUrls: [`https://matic-mainnet.chainstacklabs.com`],
    blockExplorerUrls: [`https://polygonscan.com`],
    trustWalletUid: `polygon`,
    displayName: `Polygon`,
  },
  [ChainIds.MUMBAI]: {
    chainId: hexValue(ChainIds.MUMBAI),
    chainName: `Polygon Mumbai Testnet`,
    nativeCurrency: {
      name: `tMATIC`,
      symbol: `tmatic`,
      decimals: 18,
    },
    rpcUrls: [`https://rpc-mumbai.maticvigil.com/`],
    blockExplorerUrls: [`https://mumbai.polygonscan.com`],
    trustWalletUid: `polygon`,
    displayName: `Polygon Mumbai`,
  },
  [ChainIds.BSC]: {
    chainId: hexValue(ChainIds.BSC),
    chainName: `Binance Smart Chain`,
    nativeCurrency: {
      name: `BNB`,
      symbol: `bnb`,
      decimals: 18,
    },
    rpcUrls: [`https://bsc-dataseed1.ninicoin.io`],
    blockExplorerUrls: [`https://bscscan.com`],
    trustWalletUid: `smartchain`,
    displayName: `BNB Chain`,
  },
  [ChainIds.BSC_T]: {
    chainId: hexValue(ChainIds.BSC_T),
    chainName: `Binance Smart Chain Testnet`,
    nativeCurrency: {
      name: `tBNB`,
      symbol: `tbnb`,
      decimals: 18,
    },
    rpcUrls: [`https://data-seed-prebsc-1-s1.binance.org:8545/`],
    blockExplorerUrls: [`https://testnet.bscscan.com`],
    trustWalletUid: `smartchain`,
    displayName: `BNB Chain Test`,
  },
  [ChainIds.LOCAL]: {
    chainId: hexValue(ChainIds.LOCAL),
    chainName: `Hardhat Network`,
    nativeCurrency: {
      name: `hETH`,
      symbol: `heth`,
      decimals: 18,
    },
    rpcUrls: [`http://127.0.0.1:8545`],
    blockExplorerUrls: [`http://127.0.0.1:8545`],
    trustWalletUid: `ethereum`,
    displayName: `Hardhat`,
  },
};

export const pureConfigs = Object.keys(networkConfigs).reduce((acc, key) => {
  const c = networkConfigs[key];
  return {
    ...acc,
    [key]: {
      chainId: c.chainId,
      chainName: c.chainName,
      nativeCurrency: {
        name: c.nativeCurrency.name,
        symbol: c.nativeCurrency.symbol,
        decimals: c.nativeCurrency.decimals,
      },
      rpcUrls: c.rpcUrls,
      blockExplorerUrls: c.blockExplorerUrls,
    },
  };
}, {});

const supportedChainsEnv = process.env.NEXT_PUBLIC_CHAIN_IDS;
export const supportedChains =
  supportedChainsEnv !== undefined ? JSON.parse(supportedChainsEnv) : [];

export const rpcUrlByChains = Object.keys(networkConfigs)
  .map((chainId) => Number(chainId))
  .filter((chainId) => supportedChains.includes(chainId))
  .reduce(
    (acc, chainId) => ({
      ...acc,
      [chainId]: networkConfigs[chainId].rpcUrls[0],
    }),
    {}
  );

export default networkConfigs;
