import { IndexerNetwork } from "../../common/indexer-network";

export class V2PositionManagerAddress {
  static uniswap(network: IndexerNetwork): string {
    switch (network) {
      case IndexerNetwork.ARBITRUM:
        return "0x4752ba5dbc23f44d87826276bf6fd6b1c372ad24";
    }
  }
}
