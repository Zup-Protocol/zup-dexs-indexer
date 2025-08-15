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

  const newPrices = v3PoolSetters.setPricesForPoolWhitelistedTokens(
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

  poolToken0Entity = {
    ...poolToken0Entity,
    usdPrice: newPrices.token0UpdatedPrice,
  };

  poolToken1Entity = {
    ...poolToken1Entity,
    usdPrice: newPrices.token1UpdatedPrice,
  };

  context.Pool.set(poolEntity);
  context.Token.set(poolToken0Entity);
  context.Token.set(poolToken1Entity);
  context.V3PoolData.set(v3PoolEntity);
}
