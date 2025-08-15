import { PancakeSwapV3Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolInitialize } from "../../v3-pool-initialize";

PancakeSwapV3Pool.Initialize.handler(async ({ event, context }) => {
  let poolEntity = await context.Pool.getOrThrow(event.srcAddress.toLowerCase());
  let token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  let token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

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
