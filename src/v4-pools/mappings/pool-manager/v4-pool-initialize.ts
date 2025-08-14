import { HandlerContext, Pool as PoolEntity, Protocol as ProtocolEntity, V4PoolData as V4PoolEntity } from "generated";
import { ZERO_BIG_DECIMAL } from "../../../common/constants";
import { PoolSetters } from "../../../common/pool-setters";
import { TokenService } from "../../../common/token-service";
import { sqrtPriceX96toPrice } from "../../../v3-pools/common/v3-v4-pool-converters";

export async function handleV4PoolInitialize(
  context: HandlerContext,
  poolId: string,
  token0Address: string,
  token1Address: string,
  feeTier: number,
  tickSpacing: number,
  tick: bigint,
  sqrtPriceX96: bigint,
  protocol: ProtocolEntity,
  hooks: string,
  eventTimestamp: bigint,
  v4PoolSetters: PoolSetters,
  tokenService: TokenService
): Promise<void> {
  const token0Entity = await tokenService.getOrCreateTokenEntity(token0Address);
  const token1Entity = await tokenService.getOrCreateTokenEntity(token1Address);

  const v4PoolEntity: V4PoolEntity = {
    id: poolId,
    hooks: hooks,
    sqrtPriceX96: sqrtPriceX96,
    tickSpacing: tickSpacing,
    tick: tick,
  };

  const poolEntity: PoolEntity = {
    id: poolId,
    createdAtTimestamp: eventTimestamp,
    currentFeeTier: feeTier,
    initialFeeTier: feeTier,
    isStablePool: undefined,
    poolType: "V4",
    protocol_id: protocol.id,
    token0_id: token0Entity.id,
    token1_id: token1Entity.id,
    totalValueLockedToken0: ZERO_BIG_DECIMAL,
    totalValueLockedToken1: ZERO_BIG_DECIMAL,
    totalValueLockedUSD: ZERO_BIG_DECIMAL,
    v2PoolData_id: undefined,
    v3PoolData_id: undefined,
    v4PoolData_id: v4PoolEntity.id,
  };

  v4PoolSetters.setPricesForPoolWhitelistedTokens(
    context,
    poolEntity,
    token0Entity,
    token1Entity,
    sqrtPriceX96toPrice(sqrtPriceX96, token0Entity, token1Entity)
  );

  context.Pool.set(poolEntity);
  context.V4PoolData.set(v4PoolEntity);
  context.Token.set(token0Entity);
  context.Token.set(token1Entity);
}
