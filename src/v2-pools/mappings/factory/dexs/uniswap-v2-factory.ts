import { UniswapV2Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V2PositionManagerAddress } from "../../../common/v2-position-manager-address";
import { handleV2PoolCreated } from "../v2-factory";

UniswapV2Factory.PairCreated.contractRegister(({ event, context }) => {
  context.addUniswapV2Pool(event.params.pair);
});

UniswapV2Factory.PairCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "uniswap-v2",
    name: "Uniswap V2",
    logo: "https://assets-cdn.trustwallet.com/dapps/app.uniswap.org.png",
    url: "https://uniswap.org/",
    positionManager: V2PositionManagerAddress.uniswap(event.chainId),
    permit2: undefined,
    v4PoolManager: undefined,
    v4StateView: undefined,
  });

  await handleV2PoolCreated(
    context,
    event.chainId,
    BigInt(event.block.timestamp),
    event.params.token0,
    event.params.token1,
    event.params.pair,
    3000,
    protocol,
    new TokenService(context, event.chainId)
  );
});
