import { HoneyPopV3Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V3PositionManagerAddress } from "../../../common/v3-position-manager-address";
import { handleV3PoolCreated } from "../v3-factory";

HoneyPopV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addUniswapV3Pool(event.params.pool);
});

HoneyPopV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "honeypop-v3",
    name: "Honeypop V3",
    logo: "https://honeypop.app/favicon.png",
    url: "https://honeypop.app/",
    positionManager: V3PositionManagerAddress.honeypop(event.chainId),
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
