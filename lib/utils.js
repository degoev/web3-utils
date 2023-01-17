import * as ethers from "ethers";
import { isAddress } from "ethers/lib/utils";
import Jazzicon from "@metamask/jazzicon";

import networkConfigs, { rpcUrlByChains } from "./configs/networks.js";

/**
 * @param {Object}  params
 * @param {string} params.address - The contract address
 * @param {ethers.ContractInterface} params.abi - The contract ABI
 * @param {ethers.Signer} params.signer - Tx signer
 * @param {number} params.chainId - chainId
 */
export const getContract = ({ address, abi, signer, chainId }) => {
  const provider =
    signer || new ethers.providers.JsonRpcProvider(rpcUrlByChains[chainId]);
  return new ethers.Contract(address, abi, provider);
};

// есть shortenAddress in vanilla/utils
export const formatAddress = (address, slice = 0) => {
  if (slice) {
    return address.length > slice ? `${address.slice(0, slice)}...` : address;
  }

  if (!isAddress(address)) {
    return address;
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const iconFromAddress = (address, diameter = 16) => {
  return Jazzicon(diameter, parseInt(address.slice(2, 10), 16));
};

export const getExplorerUrl = (chainId = 1) =>
  networkConfigs[chainId].blockExplorerUrls[0];
