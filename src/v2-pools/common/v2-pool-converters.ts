import { BigDecimal } from "generated";
import { safeDiv } from "../../common/math";
import { PoolPrices } from "../../common/types";

export function poolReservesToPrice(
  token0ReserveFormatted: BigDecimal,
  token1ReserveFormatted: BigDecimal
): PoolPrices {
  let price = safeDiv(token0ReserveFormatted, token1ReserveFormatted);

  let token0PerToken1Price = price;
  let token1PerToken0Price = safeDiv(BigDecimal("1"), price);

  return { token0PerToken1: token0PerToken1Price, token1PerToken0: token1PerToken0Price };
}
