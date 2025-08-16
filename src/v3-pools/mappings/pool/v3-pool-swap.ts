import { HandlerContext, Pool as PoolEntity, Token as TokenEntity } from "generated";
import { PoolSetters } from "../../../common/pool-setters";
import { formatFromTokenAmount } from "../../../common/token-commons";
import { sqrtPriceX96toPrice } from "../../common/v3-v4-pool-converters";

export async function handleV3PoolSwap(
  context: HandlerContext,
  poolEntity: PoolEntity,
  token0Entity: TokenEntity,
  token1Entity: TokenEntity,
  amount0: bigint,
  amount1: bigint,
  sqrtPriceX96: bigint,
  tick: bigint,
  eventTimestamp: bigint,
  v3PoolSetters: PoolSetters,
  feeTier: number = 0
): Promise<void> {
  const tokenAmount0Formatted = formatFromTokenAmount(amount0, token0Entity);
  const tokenAmount1Formatted = formatFromTokenAmount(amount1, token1Entity);
  let v3PoolEntity = (await context.V3PoolData.get(poolEntity.id))!;

  const newPrices = v3PoolSetters.getPricesForPoolWhitelistedTokens(
    poolEntity,
    token0Entity,
    token1Entity,
    sqrtPriceX96toPrice(sqrtPriceX96, token0Entity, token1Entity)
  );

  const poolTotalValueLockedToken0 = poolEntity.totalValueLockedToken0.plus(tokenAmount0Formatted);
  const poolTotalValueLockedToken1 = poolEntity.totalValueLockedToken1.plus(tokenAmount1Formatted);

  const poolTotalValueLockedUSD = poolEntity.totalValueLockedToken0
    .times(newPrices.token0UpdatedPrice)
    .plus(poolEntity.totalValueLockedToken1.times(newPrices.token1UpdatedPrice));

  const token0TotalTokenPooledAmount = token0Entity.totalTokenPooledAmount.plus(tokenAmount0Formatted);
  const token1TotalTokenPooledAmount = token1Entity.totalTokenPooledAmount.plus(tokenAmount1Formatted);

  const token0TotalValuePooledUsd = token0Entity.totalTokenPooledAmount.times(newPrices.token0UpdatedPrice);
  const token1TotalValuePooledUsd = token1Entity.totalTokenPooledAmount.times(newPrices.token1UpdatedPrice);

  v3PoolEntity = {
    ...v3PoolEntity,
    sqrtPriceX96: sqrtPriceX96,
    tick: tick,
  };

  poolEntity = {
    ...poolEntity,
    totalValueLockedToken0: poolTotalValueLockedToken0,
    totalValueLockedToken1: poolTotalValueLockedToken1,
    totalValueLockedUSD: poolTotalValueLockedUSD,
    currentFeeTier: feeTier != 0 ? feeTier : poolEntity.currentFeeTier,
  };

  token0Entity = {
    ...token0Entity,
    totalTokenPooledAmount: token0TotalTokenPooledAmount,
    totalValuePooledUsd: token0TotalValuePooledUsd,
    usdPrice: newPrices.token0UpdatedPrice,
  };

  token1Entity = {
    ...token1Entity,
    totalTokenPooledAmount: token1TotalTokenPooledAmount,
    totalValuePooledUsd: token1TotalValuePooledUsd,
    usdPrice: newPrices.token1UpdatedPrice,
  };

  await v3PoolSetters.setHourlyData(eventTimestamp, context, token0Entity, token1Entity, poolEntity, amount0, amount1);
  await v3PoolSetters.setDailyData(eventTimestamp, context, poolEntity, token0Entity, token1Entity, amount0, amount1);

  context.Pool.set(poolEntity);
  context.Token.set(token0Entity);
  context.Token.set(token1Entity);
  context.V3PoolData.set(v3PoolEntity);
}
