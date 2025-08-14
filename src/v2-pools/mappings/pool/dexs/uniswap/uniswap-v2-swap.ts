import { UniswapV2Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV2PoolSwap } from "../../v2-pool-swap";

UniswapV2Pool.Swap.handler(async ({ event, context }) => {
  const pool = (await context.Pool.get(event.srcAddress))!;
  const token0 = (await context.Token.get(pool.token0_id))!;
  const token1 = (await context.Token.get(pool.token1_id))!;

  await handleV2PoolSwap(
    context,
    pool,
    token0,
    token1,
    event.params.amount0In,
    event.params.amount1In,
    event.params.amount0Out,
    event.params.amount1Out,
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
