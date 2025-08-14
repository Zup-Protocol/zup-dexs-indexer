import { HandlerContext, Pool as PoolEntity, Token as TokenEntity } from "generated";
import { PoolSetters } from "../../../common/pool-setters";
import { sqrtPriceX96toPrice } from "../../common/v3-v4-pool-converters";

export async function handleV3PoolInitialize(
  context: HandlerContext,
  poolEntity: PoolEntity,
  poolToken0Entity: TokenEntity,
  poolToken1Entity: TokenEntity,
  sqrtPriceX96: bigint,
  tick: bigint,
  v3PoolSetters: PoolSetters
): Promise<void> {
  let v3PoolEntity = (await context.V3PoolData.get(poolEntity.id))!;

  v3PoolSetters.setPricesForPoolWhitelistedTokens(
    context,
    poolEntity,
    poolToken0Entity,
    poolToken1Entity,
    sqrtPriceX96toPrice(sqrtPriceX96, poolToken0Entity, poolToken1Entity)
  );

  v3PoolEntity = {
    ...v3PoolEntity,
    sqrtPriceX96: sqrtPriceX96,
    tick: tick,
  };

  context.V3PoolData.set(v3PoolEntity);
  context.Pool.set(poolEntity);
  context.Token.set(poolToken0Entity);
  context.Token.set(poolToken1Entity);
}
