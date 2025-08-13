import { ETHER_NATIVE_TOKEN } from "./constants";
import { NativeToken } from "./types";

export enum IndexerNetwork {
  ARBITRUM = 42161,
}

export namespace IndexerNetwork {
  export function getRpcUrl(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.ARBITRUM:
        return "https://arb1.arbitrum.io/rpc";
    }
  }

  export function nativeToken(network: IndexerNetwork): NativeToken {
    switch (network) {
      case IndexerNetwork.ARBITRUM:
        return ETHER_NATIVE_TOKEN;
    }
  }

  export function stablecoinsAddresses(network: IndexerNetwork): string[] {
    switch (network) {
      case IndexerNetwork.ARBITRUM:
        return [
          "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC
          "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // USDT
          "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", // USDC.e
          "0xe80772Eaf6e2E18B651F160Bc9158b2A5caFCA65", // xUSD
          "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", // DAI
          "0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07", // TUSD
          "0x6a7661795c374c0bfc635934efaddff3a7ee23b6", // DOLA
        ];
    }
  }

  export function wrappedNativeAddress(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.ARBITRUM:
        return "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";
    }
  }
}
