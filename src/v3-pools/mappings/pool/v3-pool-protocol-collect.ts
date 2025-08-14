import { HandlerContext, Pool as PoolEntity, Token as TokenEntity } from "generated";

import { PoolSetters } from "../../../common/pool-setters";
import { formatFromTokenAmount } from "../../../common/token-commons";

export async function handleV3PoolProtocolCollect(
  context: HandlerContext,
  poolEntity: PoolEntity,
  token0Entity: TokenEntity,
  token1Entity: TokenEntity,
  amount0: bigint,
  amount1: bigint,
  eventTimestamp: bigint,
  v3PoolSetters: PoolSetters
): Promise<void> {
  const token0AmountFormatted = formatFromTokenAmount(amount0, token0Entity);
  const token1AmountFormatted = formatFromTokenAmount(amount1, token1Entity);

  const poolTotalValueLockedToken0 = poolEntity.totalValueLockedToken0.minus(token0AmountFormatted);
  const poolTotalValueLockedToken1 = poolEntity.totalValueLockedToken1.minus(token1AmountFormatted);

  const token0TotalTokenPooledAmount = token0Entity.totalTokenPooledAmount.minus(token0AmountFormatted);
  const token1TotalTokenPooledAmount = token1Entity.totalTokenPooledAmount.minus(token1AmountFormatted);

  const token0TotalValuePooledUsd = token0Entity.totalTokenPooledAmount.times(token0Entity.usdPrice);
  const token1TotalValuePooledUsd = token1Entity.totalTokenPooledAmount.times(token1Entity.usdPrice);

  const poolTotalValueLockedUSD = poolEntity.totalValueLockedToken0
    .times(token0Entity.usdPrice)
    .plus(poolEntity.totalValueLockedToken1.times(token1Entity.usdPrice));

  poolEntity = {
    ...poolEntity,
    totalValueLockedToken0: poolTotalValueLockedToken0,
    totalValueLockedToken1: poolTotalValueLockedToken1,
    totalValueLockedUSD: poolTotalValueLockedUSD,
  };

  token0Entity = {
    ...token0Entity,
    totalTokenPooledAmount: token0TotalTokenPooledAmount,
    totalValuePooledUsd: token0TotalValuePooledUsd,
  };

  token1Entity = {
    ...token1Entity,
    totalTokenPooledAmount: token1TotalTokenPooledAmount,
    totalValuePooledUsd: token1TotalValuePooledUsd,
  };

  await v3PoolSetters.setPoolDailyDataTVL(eventTimestamp, poolEntity);
  context.Pool.set(poolEntity);
  context.Token.set(token0Entity);
  context.Token.set(token1Entity);
}
