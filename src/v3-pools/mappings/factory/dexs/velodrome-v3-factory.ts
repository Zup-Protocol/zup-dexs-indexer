import { VeloodromeV3Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V3PositionManagerAddress } from "../../../common/v3-position-manager-address";
import { handleV3PoolCreated } from "../v3-factory";

VeloodromeV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addAerodromeV3Pool(event.params.pool);
});

VeloodromeV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "velodrome-v3",
    name: "Velodrome V3",
    logo: "https://velodrome.finance/images/VELO/favicon.ico",
    url: "https://velodrome.finance/",
    positionManager: V3PositionManagerAddress.velodrome(event.chainId),
    permit2: undefined,
    v4PoolManager: undefined,
    v4StateView: undefined,
  });

  await handleV3PoolCreated(
    context,
    event.params.pool,
    event.params.token0,
    event.params.token1,
    0,
    Number.parseInt(event.params.tickSpacing.toString()),
    BigInt(event.block.timestamp),
    event.chainId,
    protocol,
    new TokenService(context, event.chainId)
  );
});
