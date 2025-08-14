import { AerodromeV3Factory } from "generated";
import { TokenService } from "../../../../common/token-service";
import { V3PositionManagerAddress } from "../../../common/v3-position-manager-address";
import { handleV3PoolCreated } from "../v3-factory";

AerodromeV3Factory.PoolCreated.contractRegister(({ event, context }) => {
  context.addAerodromeV3Pool(event.params.pool);
});

AerodromeV3Factory.PoolCreated.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "aerodrome-v3",
    name: "Aerodrome V3",
    logo: "https://assets-cdn.trustwallet.com/dapps/aerodrome.finance.png",
    url: "https://aerodrome.finance",
    positionManager: V3PositionManagerAddress.aerodrome(event.chainId),
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
    protocol,
    new TokenService(context, event.chainId)
  );
});
