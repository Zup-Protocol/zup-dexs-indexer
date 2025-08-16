import { UniswapV3Pool } from "generated";
import { IndexerNetwork } from "../../../../../common/indexer-network";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolSwap } from "../../v3-pool-swap";

UniswapV3Pool.Swap.handler(async ({ event, context }) => {
  const poolId = IndexerNetwork.getEntityIdFromAddress(event.chainId, event.srcAddress);
  let poolEntity = await context.Pool.getOrThrow(poolId);
  let token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  let token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

  await handleV3PoolSwap(
    context,
    poolEntity,
    token0Entity,
    token1Entity,
    event.params.amount0,
    event.params.amount1,
    event.params.sqrtPriceX96,
    BigInt(event.params.tick),
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
