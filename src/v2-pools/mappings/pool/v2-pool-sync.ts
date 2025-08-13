import { HandlerContext, Pool as PoolEntity, Token as TokenEntity } from "generated";
import { PoolSetters } from "../../../common/pool-setters";
import { formatFromTokenAmount } from "../../../common/token-commons";

export function handleV2PoolSync(
  context: HandlerContext,
  poolEntity: PoolEntity,
  token0Entity: TokenEntity,
  token1Entity: TokenEntity,
  reserve0: bigint,
  reserve1: bigint,
  eventTimestamp: bigint,
  v2PoolSetters: PoolSetters
): void {
  let oldToken0LockedValue = poolEntity.totalValueLockedToken0;
  let oldToken1LockedValue = poolEntity.totalValueLockedToken1;
  let reserve0Formatted = formatFromTokenAmount(reserve0, token0Entity);
  let reserve1Formatted = formatFromTokenAmount(reserve1, token1Entity);
  let reserve0Difference = reserve0Formatted.minus(oldToken0LockedValue);
  let reserve1Difference = reserve1Formatted.minus(oldToken1LockedValue);

  const poolTotalValueLockedToken0 = reserve0Formatted;
  const poolTotalValueLockedToken1 = reserve1Formatted;

  const poolTotalValueLockedUSD = poolEntity.totalValueLockedToken0
    .times(token0Entity.usdPrice)
    .plus(poolEntity.totalValueLockedToken1.times(token1Entity.usdPrice));

  const token0TotalTokenPooledAmount = token0Entity.totalTokenPooledAmount.plus(reserve0Difference);
  const token1TotalTokenPooledAmount = token1Entity.totalTokenPooledAmount.plus(reserve1Difference);

  const token0TotalValuePooledUsd = token0Entity.totalTokenPooledAmount.times(token0Entity.usdPrice);
  const token1TotalValuePooledUsd = token1Entity.totalTokenPooledAmount.times(token1Entity.usdPrice);

  v2PoolSetters.setPoolDailyDataTVL(eventTimestamp, poolEntity);

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

  context.Pool.set(poolEntity);
  context.Token.set(token0Entity);
  context.Token.set(token1Entity);
}
