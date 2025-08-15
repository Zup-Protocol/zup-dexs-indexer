import { PancakeSwapV4CLPoolManager } from "generated";
import { PoolSetters } from "../../../../../common/pool-setters";
import { SupportedProtocol } from "../../../../../common/supported-protocol";
import { TokenService } from "../../../../../common/token-service";
import { handleV4PoolInitialize } from "../../v4-pool-initialize";
import { getPoolTickSpacingFromParameters } from "./pancakeswap-v4-cl-utils";

PancakeSwapV4CLPoolManager.Initialize.handler(async ({ event, context }) => {
  await handleV4PoolInitialize(
    context,
    event.params.id,
    event.params.currency0,
    event.params.currency1,
    Number.parseInt(event.params.fee.toString()),
    getPoolTickSpacingFromParameters(event.params.parameters as `0x${string}`),
    BigInt(event.params.tick),
    event.params.sqrtPriceX96,
    SupportedProtocol.PANCAKESWAP_INFINITY_CL,
    event.params.hooks,
    BigInt(event.block.timestamp),
    event.chainId,
    event.srcAddress,
    new PoolSetters(context, event.chainId),
    new TokenService(context, event.chainId)
  );
});
