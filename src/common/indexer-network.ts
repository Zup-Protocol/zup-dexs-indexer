import { ETHER_NATIVE_TOKEN } from "./constants";
import { NativeToken } from "./types";

export enum IndexerNetwork {
  MAINNET = 1,
  SCROLL = 534352,
  UNICHAIN = 130,
  BASE = 8453,
  SEPOLIA = 11155111,
}

export namespace IndexerNetwork {
  export function getRpcUrl(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.MAINNET:
        return `https://eth-mainnet.g.alchemy.com/v2/${process.env.ENVIO_RPC_KEY}`;
      case IndexerNetwork.BASE:
        return `https://base-mainnet.g.alchemy.com/v2/${process.env.ENVIO_RPC_KEY}`;
      case IndexerNetwork.SCROLL:
        return `https://scroll-mainnet.g.alchemy.com/v2/${process.env.ENVIO_RPC_KEY}`;
      case IndexerNetwork.UNICHAIN:
        return `https://unichain-mainnet.g.alchemy.com/v2/${process.env.ENVIO_RPC_KEY}`;
      case IndexerNetwork.SEPOLIA:
        return `https://eth-sepolia.g.alchemy.com/v2/${process.env.ENVIO_RPC_KEY}`;
    }
  }

  export function getEntityIdFromAddress(network: IndexerNetwork, address: string): string {
    return `${network}-${address}`.toLowerCase();
  }

  export function nativeToken(network: IndexerNetwork): NativeToken {
    switch (network) {
      case IndexerNetwork.BASE:
        return ETHER_NATIVE_TOKEN;
      case IndexerNetwork.MAINNET:
        return ETHER_NATIVE_TOKEN;
      case IndexerNetwork.UNICHAIN:
        return ETHER_NATIVE_TOKEN;
      case IndexerNetwork.SCROLL:
        return ETHER_NATIVE_TOKEN;
      case IndexerNetwork.SEPOLIA:
        return ETHER_NATIVE_TOKEN;
    }
  }

  export function stablecoinsAddresses(network: IndexerNetwork): string[] {
    switch (network) {
      case IndexerNetwork.MAINNET:
        return [
          "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
          "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
          "0xdC035D45d973E3EC169d2276DDab16f1e407384F", // USDS
          "0x4c9edd5852cd905f086c759e8383e09bff1e68b3", // USDE
          "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409", // FDUSD
          "0x6c3ea9036406852006290770bedfcaba0e23a0e8", // PYUSD
        ];
      case IndexerNetwork.SCROLL:
        return [
          "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df", // USDT
          "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4", // USDC
        ];
      case IndexerNetwork.UNICHAIN:
        return [
          "0x078D782b760474a361dDA0AF3839290b0EF57AD6", // USDC
          "0x9151434b16b9763660705744891fA906F660EcC5", // USDT0
        ];
      case IndexerNetwork.BASE:
        return [
          "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
          "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // USDT
          "0x820c137fa70c8691f0e44dc420a5e53c168921dc", // USDS
          "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", // USDbC
        ];
      case IndexerNetwork.SEPOLIA:
        return [
          "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC
        ];
    }
  }

  export function wrappedNativeAddress(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0x4200000000000000000000000000000000000006";
      case IndexerNetwork.MAINNET:
        return "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
      case IndexerNetwork.UNICHAIN:
        return "0x4200000000000000000000000000000000000006";
      case IndexerNetwork.SCROLL:
        return "0x5300000000000000000000000000000000000004";
      case IndexerNetwork.SEPOLIA:
        return "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
    }
  }
}
