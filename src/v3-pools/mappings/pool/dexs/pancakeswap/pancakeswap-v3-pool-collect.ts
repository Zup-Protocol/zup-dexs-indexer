import { PancakeSwapV3Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolCollect } from "../../v3-pool-collect";

PancakeSwapV3Pool.Collect.handler(async ({ event, context }) => {
  let poolEntity = await context.Pool.getOrThrow(event.srcAddress);
  let token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  let token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

  await handleV3PoolCollect(
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
