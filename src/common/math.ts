import { BigDecimal } from "generated";
import { ONE_BIG_INT, ZERO_BIG_DECIMAL } from "./constants";

export function safeDiv(a: BigDecimal, b: BigDecimal): BigDecimal {
  if (b.eq(ZERO_BIG_DECIMAL)) return ZERO_BIG_DECIMAL;

  return a.div(b);
}

export function hexToBigInt(hex: string): BigInt {
  if (hex.startsWith("0x")) {
    hex = hex.slice(2);
  }

  let decimal = "0";

  for (let i = 0; i < hex.length; i++) {
    decimal = BigInt(decimal) * BigInt(16) + BigInt(parseInt(hex.charAt(i), 16)).toString();
  }

  return BigInt(decimal);
}

export function mulDivRoundingUp(a: bigint, b: bigint, denominator: bigint): bigint {
  const product = a * b;
  let result = product / denominator;

  if (!(product % denominator != BigInt(0))) result = result + ONE_BIG_INT;
  return result;
}
