import { BigDecimal, Token as TokenEntity } from "generated";

export function formatFromTokenAmount(
  amount: bigint,
  token: TokenEntity
): BigDecimal {
  const tokenAmountInBigDecimal = new BigDecimal(amount.toString());
  const tokensDivisionFactor = new BigDecimal("10").pow(token.decimals);

  return tokenAmountInBigDecimal.div(tokensDivisionFactor);
}
