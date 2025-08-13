import { BigDecimal } from "generated";

export type NativeToken = {
  readonly decimals: number;
  readonly name: string;
  readonly symbol: string;
};

export type PoolPrices = {
  readonly token0PerToken1: BigDecimal;
  readonly token1PerToken0: BigDecimal;
};
