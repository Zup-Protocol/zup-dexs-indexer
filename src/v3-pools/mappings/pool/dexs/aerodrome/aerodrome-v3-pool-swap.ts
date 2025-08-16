import { experimental_createEffect, S } from "envio";
import { AerodromeV3Pool } from "generated";
import { createPublicClient, getContract, http } from "viem";
import { IndexerNetwork } from "../../../../../common/indexer-network";
import { PoolSetters } from "../../../../../common/pool-setters";
import { handleV3PoolSwap } from "../../v3-pool-swap";

AerodromeV3Pool.Swap.handler(async ({ event, context }) => {
  const poolId = IndexerNetwork.getEntityIdFromAddress(event.chainId, event.srcAddress);
  const poolEntity = await context.Pool.getOrThrow(poolId);
  const token0Entity = await context.Token.getOrThrow(poolEntity.token0_id);
  const token1Entity = await context.Token.getOrThrow(poolEntity.token1_id);

  const swapFee = await context.effect(swapFeeEffect, { chainId: event.chainId, poolAddress: event.srcAddress });

  await handleV3PoolSwap(
    context,
    poolEntity,
    token0Entity,
    token1Entity,
    event.params.amount0,
    event.params.amount1,
    event.params.sqrtPriceX96,
    BigInt(event.params.tick),
    BigInt(event.block.timestamp),
    new PoolSetters(context, event.chainId),
    swapFee
  );
});

const SwapFeeSchemaInput = S.tuple((t) => ({
  poolAddress: t.item(0, S.string),
  chainId: t.item(1, S.number),
}));

const SwapFeeSchemaOutput = S.number;

type SwapFeeSchemaOutput = S.Output<typeof SwapFeeSchemaOutput>;
type SwapFeeSchemaInput = S.Input<typeof SwapFeeSchemaInput>;

const swapFeeEffect = experimental_createEffect(
  {
    name: "aerodrome-v3-pool-swap-fee",
    input: SwapFeeSchemaInput,
    output: SwapFeeSchemaOutput,
    cache: true,
  },
  async ({ input }) => {
    return await _getPoolSwapFee(input.chainId, input.poolAddress);
  }
);

async function _getPoolSwapFee(network: IndexerNetwork, poolAddress: string): Promise<number> {
  const client = createPublicClient({
    transport: http(IndexerNetwork.getRpcUrl(network), { batch: true }),
  });
  const contract = getContract({
    abi: aerodromeV3PoolSwapFeeAbi,
    client,
    address: poolAddress as `0x${string}`,
  });

  const swapFee = await contract.read.fee();
  return swapFee;
}

const aerodromeV3PoolSwapFeeAbi = [
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
