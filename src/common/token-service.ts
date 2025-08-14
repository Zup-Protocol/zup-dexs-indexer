import { HandlerContext, Token as TokenEntity } from "generated";
import { ZERO_ADDRESS, ZERO_BIG_DECIMAL } from "./constants";
import { getTokenMetadataEffect } from "./effects";
import { IndexerNetwork } from "./indexer-network";

export class TokenService {
  constructor(readonly context: HandlerContext, readonly network: IndexerNetwork) {}

  async getOrCreateTokenEntity(tokenAddress: string): Promise<TokenEntity> {
    let tokenEntity = await this.context.Token.get(tokenAddress);
    const isNativeToken: boolean = tokenAddress == ZERO_ADDRESS;

    if (!tokenEntity) {
      if (isNativeToken) {
        let nativeToken = IndexerNetwork.nativeToken(this.network);

        tokenEntity = {
          id: tokenAddress,
          decimals: nativeToken.decimals,
          symbol: nativeToken.symbol,
          name: nativeToken.name,
          totalTokenPooledAmount: ZERO_BIG_DECIMAL,
          totalValuePooledUsd: ZERO_BIG_DECIMAL,
          usdPrice: ZERO_BIG_DECIMAL,
        };

        return tokenEntity;
      }

      let remoteTokenMetadata = await this.context.effect(getTokenMetadataEffect, {
        chainId: this.network,
        tokenAddress: tokenAddress,
      });

      tokenEntity = {
        id: tokenAddress,
        decimals: remoteTokenMetadata.decimals,
        symbol: remoteTokenMetadata.symbol,
        name: remoteTokenMetadata.name,
        totalTokenPooledAmount: ZERO_BIG_DECIMAL,
        totalValuePooledUsd: ZERO_BIG_DECIMAL,
        usdPrice: ZERO_BIG_DECIMAL,
      };
    }

    return tokenEntity!;
  }
}
