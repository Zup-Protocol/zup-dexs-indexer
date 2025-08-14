import { ONE_BIG_INT, Q96 } from "../../common/constants";
import { mulDivRoundingUp } from "../../common/math";

export abstract class SqrtPriceMath {
  public static getAmount0Delta(
    sqrtRatioAX96: bigint,
    sqrtRatioBX96: bigint,
    liquidity: bigint,
    roundUp: boolean
  ): bigint {
    if (sqrtRatioAX96 > sqrtRatioBX96) {
      const temp = sqrtRatioAX96;
      sqrtRatioAX96 = sqrtRatioBX96;
      sqrtRatioBX96 = temp;
    }

    const numerator1 = liquidity << BigInt(96);
    const numerator2 = sqrtRatioBX96 - sqrtRatioAX96;

    return roundUp
      ? mulDivRoundingUp(mulDivRoundingUp(numerator1, numerator2, sqrtRatioBX96), ONE_BIG_INT, sqrtRatioAX96)
      : (numerator1 * numerator2) / sqrtRatioBX96 / sqrtRatioAX96;
  }

  public static getAmount1Delta(
    sqrtRatioAX96: bigint,
    sqrtRatioBX96: bigint,
    liquidity: bigint,
    roundUp: boolean
  ): bigint {
    if (sqrtRatioAX96 > sqrtRatioBX96) {
      const temp = sqrtRatioAX96;
      sqrtRatioAX96 = sqrtRatioBX96;
      sqrtRatioBX96 = temp;
    }

    const difference = sqrtRatioBX96 - sqrtRatioAX96;

    return roundUp ? mulDivRoundingUp(liquidity, difference, Q96) : (liquidity * difference) / Q96;
  }
}
