import { UniswapV4PoolManager } from "generated";
import { Permit2Address } from "../../../../../common/permit2-address";
import { PoolSetters } from "../../../../../common/pool-setters";
import { TokenService } from "../../../../../common/token-service";
import { V4PositionManagerAddress } from "../../../../common/v4-position-manager-address";
import { V4StateViewAddress } from "../../../../common/v4-state-view-address";
import { handleV4PoolInitialize } from "../../v4-pool-initialize";

UniswapV4PoolManager.Initialize.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "uniswap-v4",
    name: "Uniswap V4",
    url: "https://uniswap.org",
    logo: "https://assets-cdn.trustwallet.com/dapps/app.uniswap.org.png",
    positionManager: V4PositionManagerAddress.uniswap(event.chainId),
    permit2: Permit2Address.uniswap(event.chainId),
    v4StateView: V4StateViewAddress.uniswap(event.chainId),
    v4PoolManager: event.srcAddress,
  });

  await handleV4PoolInitialize(
    context,
    event.params.id,
    event.params.currency0,
    event.params.currency1,
    Number.parseInt(event.params.fee.toString()),
    Number.parseInt(event.params.tickSpacing.toString()),
    BigInt(event.params.tick),
    event.params.sqrtPriceX96,
    protocol,
    event.params.hooks,
    BigInt(event.block.timestamp),
    event.chainId,
    new PoolSetters(context, event.chainId),
    new TokenService(context, event.chainId)
  );
});
