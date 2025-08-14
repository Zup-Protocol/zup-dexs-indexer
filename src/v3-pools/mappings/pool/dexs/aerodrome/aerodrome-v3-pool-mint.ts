import { AerodromeV3Pool } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolMint } from "../../v3-pool-mint";

AerodromeV3Pool.Mint.handler(async ({ event, context }) => {
  let poolEntity = await context.Pool.getOrThrow(event.srcAddress);
  let token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  let token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

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
