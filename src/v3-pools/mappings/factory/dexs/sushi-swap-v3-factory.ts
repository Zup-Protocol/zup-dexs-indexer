import { SushiSwapV3Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V3PositionManagerAddress } from "../../../common/v3-position-manager-address";
import { handleV3PoolCreated } from "../v3-factory";

SushiSwapV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addUniswapV3Pool(event.params.pool);
});

SushiSwapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "sushi-swap-v3",
    name: "SushiSwap V3",
    logo: "https://assets-cdn.trustwallet.com/dapps/app.sushi.com.png",
    url: "https://sushi.com/",
    positionManager: V3PositionManagerAddress.sushiSwap(event.chainId),
    permit2: undefined,
    v4PoolManager: undefined,
    v4StateView: undefined,
  });

  await handleV3PoolCreated(
    context,
    event.params.pool,
    event.params.token0,
    event.params.token1,
    Number.parseInt(event.params.fee.toString()),
    Number.parseInt(event.params.tickSpacing.toString()),
    BigInt(event.block.timestamp),
    protocol,
    new TokenService(context, event.chainId)
  );
});
