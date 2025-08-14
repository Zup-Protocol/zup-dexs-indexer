import { bytesToNumber, hexToBytes } from "viem";

export function getPoolTickSpacingFromParameters(parameters: `0x${string}`): number {
  const bytes = hexToBytes(parameters);

  const tickSpacingBytes = bytes.slice(27, 30);
  return bytesToNumber(tickSpacingBytes, { signed: false });
}
