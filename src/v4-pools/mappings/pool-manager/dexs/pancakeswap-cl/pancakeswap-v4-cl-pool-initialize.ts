import { PancakeSwapV4CLPoolManager } from "generated";
import { Permit2Address } from "../../../../../common/permit2-address";
import { PoolSetters } from "../../../../../common/pool-setters";
import { TokenService } from "../../../../../common/token-service";
import { V4PositionManagerAddress } from "../../../../common/v4-position-manager-address";
import { handleV4PoolInitialize } from "../../v4-pool-initialize";
import { getPoolTickSpacingFromParameters } from "./pancakeswap-v4-cl-utils";

PancakeSwapV4CLPoolManager.Initialize.handler(async ({ event, context }) => {
  const protocol = await context.Protocol.getOrCreate({
    id: "pancakeswap-v4-cl",
    name: "PancakeSwap Infinity CL",
    url: "https://pancakeswap.finance/",
    logo: "https://assets-cdn.trustwallet.com/dapps/pancakeswap.finance.png",
    positionManager: V4PositionManagerAddress.pancakeSwap(event.chainId),
    permit2: Permit2Address.pancakeSwap(event.chainId),
    v4StateView: undefined,
    v4PoolManager: event.srcAddress,
  });

  await handleV4PoolInitialize(
    context,
    event.params.id,
    event.params.currency0,
    event.params.currency1,
    Number.parseInt(event.params.fee.toString()),
    getPoolTickSpacingFromParameters(event.params.parameters as `0x${string}`),
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
