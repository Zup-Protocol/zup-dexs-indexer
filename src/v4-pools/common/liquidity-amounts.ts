import { ZERO_BIG_INT } from "../../common/constants";
import { SqrtPriceMath } from "./sqrt-price-match";
import { TickMath } from "./tick-math";

export function getAmount0(
  tickLower: number,
  tickUpper: number,
  currTick: bigint,
  liquidityDelta: bigint,
  currSqrtPriceX96: bigint
): bigint {
  const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
  const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);

  let amount0 = ZERO_BIG_INT;
  const roundUp = liquidityDelta > ZERO_BIG_INT;

  if (currTick < tickLower) {
    amount0 = SqrtPriceMath.getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidityDelta, roundUp);
  } else if (currTick < tickUpper) {
    amount0 = SqrtPriceMath.getAmount0Delta(currSqrtPriceX96, sqrtRatioBX96, liquidityDelta, roundUp);
  } else {
    amount0 = ZERO_BIG_INT;
  }

  return amount0;
}

export function getAmount1(
  tickLower: number,
  tickUpper: number,
  currTick: bigint,
  amount: bigint,
  currSqrtPriceX96: bigint
): bigint {
  const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
  const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);

  let amount1 = ZERO_BIG_INT;
  const roundUp = amount > ZERO_BIG_INT;

  if (currTick < tickLower) {
    amount1 = ZERO_BIG_INT;
  } else if (currTick < tickUpper) {
    amount1 = SqrtPriceMath.getAmount1Delta(sqrtRatioAX96, currSqrtPriceX96, amount, roundUp);
  } else {
    amount1 = SqrtPriceMath.getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, amount, roundUp);
  }

  return amount1;
}
