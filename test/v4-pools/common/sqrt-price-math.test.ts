import assert from "assert";
import { SqrtPriceMath } from "../../../src/v4-pools/common/sqrt-price-match";

describe("SqrtPriceMath", () => {
  describe("getAmount0Delta", () => {
    it("calculates amount0 correctly when sqrtRatioAX96 < sqrtRatioBX96", () => {
      const sqrtRatioAX96 = BigInt("1000000000000000000"); // 1e18
      const sqrtRatioBX96 = BigInt("1500000000000000000"); // 1.5e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = false;

      const result = SqrtPriceMath.getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("26409387504754779197847983445"));
    });

    it("calculates amount0 correctly when sqrtRatioAX96 > sqrtRatioBX96", () => {
      const sqrtRatioAX96 = BigInt("1500000000000000000"); // 1.5e18
      const sqrtRatioBX96 = BigInt("1000000000000000000"); // 1e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = false;

      const result = SqrtPriceMath.getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("26409387504754779197847983445"));
    });

    it("rounds up when specified", () => {
      const sqrtRatioAX96 = BigInt("1000000000000000000"); // 1e18
      const sqrtRatioBX96 = BigInt("1500000000000000000"); // 1.5e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = true;

      const result = SqrtPriceMath.getAmount0Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("26409387504754779197847983446"));
    });
  });

  describe("getAmount1Delta", () => {
    it("calculates amount1 correctly when sqrtRatioAX96 < sqrtRatioBX96", () => {
      const sqrtRatioAX96 = BigInt("1000000000000000000"); // 1e18
      const sqrtRatioBX96 = BigInt("1500000000000000000"); // 1.5e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = false;

      const result = SqrtPriceMath.getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("6310887"));
    });

    it("calculates amount1 correctly when sqrtRatioAX96 > sqrtRatioBX96", () => {
      const sqrtRatioAX96 = BigInt("1500000000000000000"); // 1.5e18
      const sqrtRatioBX96 = BigInt("1000000000000000000"); // 1e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = false;

      const result = SqrtPriceMath.getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("6310887"));
    });

    it("rounds up when specified", () => {
      const sqrtRatioAX96 = BigInt("1000000000000000000"); // 1e18
      const sqrtRatioBX96 = BigInt("1500000000000000000"); // 1.5e18
      const liquidity = BigInt("1000000000000000000"); // 1e18
      const roundUp = true;

      const result = SqrtPriceMath.getAmount1Delta(sqrtRatioAX96, sqrtRatioBX96, liquidity, roundUp);
      assert.equal(result, BigInt("6310888"));
    });
  });
});
