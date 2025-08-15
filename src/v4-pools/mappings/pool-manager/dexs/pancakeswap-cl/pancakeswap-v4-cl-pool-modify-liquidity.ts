import { PancakeSwapV4CLPoolManager } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV4PoolModifyLiquidity } from "../../v4-pool-modify-liquidity";

PancakeSwapV4CLPoolManager.ModifyLiquidity.handler(async ({ event, context }) => {
  const poolEntity = await context.Pool.getOrThrow(event.params.id.toLowerCase());
  const token0 = await context.Token.getOrThrow(poolEntity.token0_id);
  const token1 = await context.Token.getOrThrow(poolEntity.token1_id);

  await handleV4PoolModifyLiquidity(
    context,
    poolEntity,
    token0,
    token1,
    event.params.liquidityDelta,
    Number.parseInt(event.params.tickLower.toString()),
    Number.parseInt(event.params.tickUpper.toString()),
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId)
  );
});
