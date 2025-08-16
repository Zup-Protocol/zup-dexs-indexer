import { UniswapV2Pool } from "generated";
import { IndexerNetwork } from "../../../../../common/indexer-network";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV2PoolBurn } from "../../v2-pool-burn";

UniswapV2Pool.Burn.handler(async ({ event, context }) => {
  const poolId = IndexerNetwork.getEntityIdFromAddress(event.chainId, event.srcAddress);
  const pool = await context.Pool.getOrThrow(poolId);
  const token0 = (await context.Token.get(pool.token0_id))!;
  const token1 = (await context.Token.get(pool.token1_id))!;

  await handleV2PoolBurn(
    context,
    pool,
    token0,
    token1,
    event.params.amount0,
    event.params.amount1,
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
