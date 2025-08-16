import { UniswapV3Pool } from "generated";
import { IndexerNetwork } from "../../../../../common/indexer-network";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolMint } from "../../v3-pool-mint";

UniswapV3Pool.Mint.handler(async ({ event, context }) => {
  const poolId = IndexerNetwork.getEntityIdFromAddress(event.chainId, event.srcAddress);
  const poolEntity = await context.Pool.getOrThrow(poolId);
  const token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  const token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

  await handleV3PoolMint(
    context,
    poolEntity,
    token0Entity,
    token1Entity,
    event.params.amount0,
    event.params.amount1,
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
