import { BaseSwapV3Factory } from "generated";
import { SupportedProtocol } from "../../../../common/supported-protocol";
import { TokenService } from "../../../../common/token-service";
import { handleV3PoolCreated } from "../v3-factory";

BaseSwapV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addUniswapV3Pool(event.params.pool);
});

BaseSwapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  await handleV3PoolCreated(
    context,
    event.params.pool,
    event.params.token0,
    event.params.token1,
    Number.parseInt(event.params.fee.toString()),
    Number.parseInt(event.params.tickSpacing.toString()),
    BigInt(event.block.timestamp),
    event.chainId,
    SupportedProtocol.BASESWAP_V3,
    new TokenService(context, event.chainId)
  );
});
