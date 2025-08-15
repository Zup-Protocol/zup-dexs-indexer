import { PancakeSwapV3Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V3PositionManagerAddress } from "../../../common/v3-position-manager-address";
import { handleV3PoolCreated } from "../v3-factory";

PancakeSwapV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addPancakeSwapV3Pool(event.params.pool);
});

PancakeSwapV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "pancakeswap-v3",
    name: "PancakeSwap V3",
    logo: "https://assets-cdn.trustwallet.com/dapps/exchange.pancakeswap.finance.png",
    url: "https://pancakeswap.finance",
    positionManager: V3PositionManagerAddress.pancakeSwap(event.chainId),
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
    event.chainId,
    protocol,
    new TokenService(context, event.chainId)
  );
});
