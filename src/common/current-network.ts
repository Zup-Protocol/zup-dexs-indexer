// import { dataSource } from "@graphprotocol/graph-ts";
// import { HandlerContext } from "generated";
// import {
//   ARBITRUM_NETWORK_NAME,
//   BASE_NETWORK_NAME,
//   BNB_NETWORK_NAME,
//   MAINNET_NETWORK_NAME,
//   OP_NETWORK_NAME,
//   POLYGON_NETWORK_NAME,
//   SCROLL_NETWORK_NAME,
//   SEPOLIA_NETWORK_NAME,
//   UNICHAIN_NETWORK_NAME,
// } from "./constants";

// export abstract class CurrentNetwork {
//   private static unsupportedNetworkError: Error = new Error("Unsupported network: " + dataSource.network());

//   static get rpcUrl(context: HandlerContext): {};

//   static get wrappedNativeAddress(): string {
//     if (dataSource.network() == MAINNET_NETWORK_NAME) return "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
//     if (dataSource.network() == SCROLL_NETWORK_NAME) return "0x5300000000000000000000000000000000000004";
//     if (dataSource.network() == SEPOLIA_NETWORK_NAME) return "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14";
//     if (dataSource.network() == BASE_NETWORK_NAME) return "0x4200000000000000000000000000000000000006";
//     if (dataSource.network() == UNICHAIN_NETWORK_NAME) return "0x4200000000000000000000000000000000000006";
//     if (dataSource.network() == BNB_NETWORK_NAME) return "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
//     if (dataSource.network() == ARBITRUM_NETWORK_NAME) return "";
//     if (dataSource.network() == POLYGON_NETWORK_NAME) return "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
//     if (dataSource.network() == OP_NETWORK_NAME) return "0x4200000000000000000000000000000000000006";

//     throw CurrentNetwork.unsupportedNetworkError;
//   }

//   static get stablecoinsAddresses(): string[] {
//     if (dataSource.network() == MAINNET_NETWORK_NAME) {
//       return [
//         "0xdac17f958d2ee523a2206206994597c13d831ec7", // USDT
//         "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", // USDC
//         "0xdC035D45d973E3EC169d2276DDab16f1e407384F", // USDS
//         "0x4c9edd5852cd905f086c759e8383e09bff1e68b3", // USDE
//         "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409", // FDUSD
//         "0x6c3ea9036406852006290770bedfcaba0e23a0e8", // PYUSD
//       ];
//     }

//     if (dataSource.network() == SCROLL_NETWORK_NAME) {
//       return [
//         "0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df", // USDT
//         "0x06eFdBFf2a14a7c8E15944D1F4A48F9F95F663A4", // USDC
//       ];
//     }

//     if (dataSource.network() == SEPOLIA_NETWORK_NAME) {
//       return [
//         "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", // USDC
//       ];
//     }

//     if (dataSource.network() == BASE_NETWORK_NAME) {
//       return [
//         "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC
//         "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2", // USDT
//         "0x820c137fa70c8691f0e44dc420a5e53c168921dc", // USDS
//         "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", // USDbC
//       ];
//     }

//     if (dataSource.network() == UNICHAIN_NETWORK_NAME) {
//       return [
//         "0x078D782b760474a361dDA0AF3839290b0EF57AD6", // USDC
//         "0x9151434b16b9763660705744891fA906F660EcC5", // USDT0
//       ];
//     }

//     if (dataSource.network() == BNB_NETWORK_NAME) {
//       return [
//         "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d", // USDC
//         "0x55d398326f99059ff775485246999027b3197955", // USDT
//         "0xc5f0f7b66764F6ec8C8Dff7BA683102295E16409", // FDUSD
//         "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34", // USDe
//         "0x2492D0006411Af6C8bbb1c8afc1B0197350a79e9", // USR
//       ];
//     }

//     if (dataSource.network() == ARBITRUM_NETWORK_NAME) {
//       return [];
//     }

//     if (dataSource.network() == POLYGON_NETWORK_NAME) {
//       return [
//         "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359", // USDC
//         "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", // USDC.e
//         "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT
//         "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", // DAI
//         "0xbC2b48BC930Ddc4E5cFb2e87a45c379Aab3aac5C", // DOLA
//       ];
//     }

//     if (dataSource.network() == OP_NETWORK_NAME) {
//       return [
//         "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", // USDC
//         "0x7f5c764cbc14f9669b88837ca1490cca17c31607", // USDC.e
//         "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58", // USDT
//         "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", // DAI
//         "0x8aE125E8653821E851F12A49F7765db9a9ce7384", // DOLA
//         "0x5d3a1ff2b6bab83b63cd9ad0787074081a52ef34", // USDe
//       ];
//     }

//     throw CurrentNetwork.unsupportedNetworkError;
//   }
// }
