import { BigDecimal } from "generated";
import { hexToBigInt } from "./math";
import { NativeToken } from "./types";

export const ZERO_BIG_DECIMAL = BigDecimal(0);

export const ZERO_BIG_INT = BigInt(0);

export const MAX_UINT256 = hexToBigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const ONE_BIG_INT = BigInt(1);

export const Q96 = BigInt(2) ** BigInt(96);

export const ONE_HOUR_IN_SECONDS = 3_600;

export const OP_NETWORK_NAME = "optimism";

export const ETHER_NATIVE_TOKEN: NativeToken = {
  decimals: 18,
  name: "Ether",
  symbol: "ETH",
};

export const ERC20_ABI = [
  {
    inputs: [],
    name: "name",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NAME",
    outputs: [{ type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SYMBOL",
    outputs: [{ type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
