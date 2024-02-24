import { ethers } from "ethers";

export function constructSpoofKey(
  predecessor: string,
  path: string
): ethers.utils.SigningKey {
  const data = ethers.utils.toUtf8Bytes(`${predecessor},${path}`);
  const hash = ethers.utils.sha256(data);
  const signingKey = new ethers.utils.SigningKey(hash);
  return signingKey;
}

export function getEvmAddress(predecessor: string, path: string): string {
  const signingKey = constructSpoofKey(predecessor, path);
  const publicKey = signingKey.publicKey;
  const evmAddress = ethers.utils.computeAddress(publicKey);
  return evmAddress;
}
