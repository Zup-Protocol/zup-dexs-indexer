import { UniswapV3Pool } from "generated";
import { IndexerNetwork } from "../../../../../common/indexer-network";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolInitialize } from "../../v3-pool-initialize";

UniswapV3Pool.Initialize.handler(async ({ event, context }) => {
  const poolId = IndexerNetwork.getEntityIdFromAddress(event.chainId, event.srcAddress);
  const poolEntity = await context.Pool.getOrThrow(poolId);
  const token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  const token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

  await handleV3PoolInitialize(
    context,
    poolEntity,
    token0Entity,
    token1Entity,
    event.params.sqrtPriceX96,
    BigInt(event.params.tick),
    new PoolSetters(context, event.chainId)
  );
});
