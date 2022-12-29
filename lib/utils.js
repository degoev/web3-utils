import ethers from "ethers";
import { rpcUrlByChains } from "./configs/networks";

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
