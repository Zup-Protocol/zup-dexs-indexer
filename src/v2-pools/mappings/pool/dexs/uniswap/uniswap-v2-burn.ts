import { UniswapV2Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV2PoolBurn } from "../../v2-pool-burn";

UniswapV2Pool.Burn.handler(async ({ event, context }) => {
  const pool = (await context.Pool.get(event.srcAddress))!;
  const token0 = (await context.Token.get(pool.token0_id))!;
  const token1 = (await context.Token.get(pool.token1_id))!;

  handleV2PoolBurn(
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
