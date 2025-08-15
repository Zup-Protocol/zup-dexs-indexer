import {
  HandlerContext,
  Pool as PoolEntity,
  Protocol as ProtocolEntity,
  V3PoolData as V3PoolDataEntity,
} from "generated";
import { ZERO_BIG_DECIMAL, ZERO_BIG_INT } from "../../../common/constants";
import { TokenService } from "../../../common/token-service";

export async function handleV3PoolCreated(
  context: HandlerContext,
  poolAddress: string,
  token0Address: string,
  token1Address: string,
  feeTier: number,
  tickSpacing: number,
  eventTimestamp: bigint,
  chainId: number,
  protocol: ProtocolEntity,
  tokenService: TokenService
): Promise<PoolEntity> {
  const token0Entity = await tokenService.getOrCreateTokenEntity(token0Address);
  const token1Entity = await tokenService.getOrCreateTokenEntity(token1Address);

  const v3PoolEntity: V3PoolDataEntity = {
    id: poolAddress,
    tickSpacing: tickSpacing,
    sqrtPriceX96: ZERO_BIG_INT,
    tick: ZERO_BIG_INT,
  };

  const poolEntity: PoolEntity = {
    id: poolAddress,
    token0_id: token0Address,
    token1_id: token1Address,
    currentFeeTier: feeTier,
    initialFeeTier: feeTier,
    totalValueLockedUSD: ZERO_BIG_DECIMAL,
    totalValueLockedToken0: ZERO_BIG_DECIMAL,
    totalValueLockedToken1: ZERO_BIG_DECIMAL,
    createdAtTimestamp: eventTimestamp,
    protocol_id: protocol.id,
    isStablePool: undefined,
    poolType: "V3",
    v2PoolData_id: undefined,
    v4PoolData_id: undefined,
    v3PoolData_id: v3PoolEntity.id,
    chainId: chainId,
  };

  context.V3PoolData.set(v3PoolEntity);
  context.Pool.set(poolEntity);
  context.Token.set(token0Entity);
  context.Token.set(token1Entity);

  return poolEntity;
}
