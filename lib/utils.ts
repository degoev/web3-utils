import ethers from "ethers";
import { rpcUrlByChains, ChainIds } from "./configs/networks";

export const getContract = ({
  address,
  abi,
  signer,
  chainId,
}: {
  address: string;
  abi: ethers.ContractInterface;
  signer: ethers.Signer;
  chainId: ChainIds;
}) => {
  const provider =
    signer || new ethers.providers.JsonRpcProvider(rpcUrlByChains[chainId]);
  return new ethers.Contract(address, abi, provider);
};
