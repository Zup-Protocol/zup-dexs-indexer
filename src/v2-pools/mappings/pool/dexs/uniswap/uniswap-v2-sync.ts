import { UniswapV2Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV2PoolSync } from "../../v2-pool-sync";

UniswapV2Pool.Sync.handler(async ({ event, context }) => {
  const pool = await context.Pool.getOrThrow(event.srcAddress.toLowerCase());
  const token0 = (await context.Token.get(pool.token0_id))!;
  const token1 = (await context.Token.get(pool.token1_id))!;

  await handleV2PoolSync(
    context,
    pool,
    token0,
    token1,
    event.params.reserve0,
    event.params.reserve1,
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
