import { IndexerNetwork } from "../../common/indexer-network";

export class V3PositionManagerAddress {
  static aerodrome(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0x827922686190790b37229fd06084350E74485b72";
      default:
        throw Error(`Aerodrome is not supported on ${network}`);
    }
  }

  static uniswap(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0x03a520b32C04BF3bEEf7BEb72E919cf822Ed34f1";
      case IndexerNetwork.MAINNET:
        return "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
      case IndexerNetwork.UNICHAIN:
        return "0x943e6e07a7e8e791dafc44083e54041d743c46e9";
      case IndexerNetwork.SCROLL:
        return "0xB39002E4033b162fAc607fc3471E205FA2aE5967";
      case IndexerNetwork.SEPOLIA:
        return "0x1238536071E1c677A632429e3655c799b22cDA52";
    }
  }

  static pancakeSwap(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
      case IndexerNetwork.MAINNET:
        return "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
      case IndexerNetwork.UNICHAIN:
        throw Error(`PancakeSwap is not supported on Unichain`);
      case IndexerNetwork.SCROLL:
        return "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
      case IndexerNetwork.SEPOLIA:
        return "0x46A15B0b27311cedF172AB29E4f4766fbE7F4364";
    }
  }

  static sushiSwap(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0x80C7DD17B01855a6D2347444a0FCC36136a314de";
      case IndexerNetwork.MAINNET:
        return "0x2214A42d8e2A1d20635c2cb0664422c528B6A432";
      case IndexerNetwork.UNICHAIN:
        throw Error(`SushiSwap is not supported on Unichain`);
      case IndexerNetwork.SCROLL:
        return "0x0389879e0156033202C44BF784ac18fC02edeE4f";
      case IndexerNetwork.SEPOLIA:
        throw Error(`SushiSwap is not supported on Sepolia`);
    }
  }

  static zebra(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.SCROLL:
        return "0x349B654dcbce53943C8e87F914F62ae9526C6681";
      default:
        throw Error(`Zebra is not supported on ${network}`);
    }
  }

  static baseSwap(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0xDe151D5c92BfAA288Db4B67c21CD55d5826bCc93";
      default:
        throw Error(`BaseSwap is not supported on ${network}`);
    }
  }

  static alienBase(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.BASE:
        return "0xB7996D1ECD07fB227e8DcA8CD5214bDfb04534E5";
      default:
        throw Error(`AlienBase is not supported on ${network}`);
    }
  }
}
