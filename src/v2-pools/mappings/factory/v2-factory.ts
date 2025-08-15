import {
  HandlerContext,
  Pool as PoolEntity,
  Protocol as ProtocolEntity,
  V2PoolData as V2PoolDataEntity,
} from "generated";

import { ZERO_BIG_DECIMAL } from "../../../common/constants";
import { TokenService } from "../../../common/token-service";

export async function handleV2PoolCreated(
  context: HandlerContext,
  chainId: number,
  eventTimestamp: bigint,
  token0Address: string,
  token1Address: string,
  poolAddress: string,
  feeTier: number,
  protocol: ProtocolEntity,
  tokenService: TokenService
): Promise<PoolEntity> {
  const token0Entity = await tokenService.getOrCreateTokenEntity(token0Address);
  const token1Entity = await tokenService.getOrCreateTokenEntity(token1Address);

  const v2PoolEntity: V2PoolDataEntity = {
    id: poolAddress,
  };

  const poolEntity: PoolEntity = {
    id: poolAddress,
    createdAtTimestamp: eventTimestamp,
    currentFeeTier: feeTier,
    initialFeeTier: feeTier,
    totalValueLockedToken0: ZERO_BIG_DECIMAL,
    poolType: "V2",
    protocol_id: protocol.id,
    token0_id: token0Entity.id,
    token1_id: token1Entity.id,
    totalValueLockedToken1: ZERO_BIG_DECIMAL,
    totalValueLockedUSD: ZERO_BIG_DECIMAL,
    isStablePool: undefined,
    v2PoolData_id: v2PoolEntity.id,
    v3PoolData_id: undefined,
    v4PoolData_id: undefined,
    chainId: chainId,
  };

  context.Token.set(token0Entity);
  context.Token.set(token1Entity);
  context.Pool.set(poolEntity);

  return poolEntity;
}
