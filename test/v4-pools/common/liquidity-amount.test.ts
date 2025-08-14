import assert from "assert";
import { ZERO_BIG_INT } from "../../../src/common/constants";
import { getAmount0, getAmount1 } from "../../../src/v4-pools/common/liquidity-amounts";

describe("Amount Calculations", () => {
  describe("getAmount0", () => {
    it("returns correct amount when current tick is below lower tick", () => {
      const result = getAmount0(-10, 10, BigInt(-20), BigInt(1000000), BigInt("79148977909814923576066331265"));
      assert.equal(result, BigInt(1000));
    });

    it("returns correct amount when current tick is between lower and upper tick", () => {
      const result = getAmount0(-10, 10, BigInt(0), BigInt(1000000), BigInt("79228162514264337593543950336"));
      assert(result > ZERO_BIG_INT, "Result should be greater than zero");
      assert(result < BigInt(1000000), "Result should be less than 1000000");
    });

    it("returns zero when current tick is above upper tick", () => {
      const result = getAmount0(-10, 10, BigInt(20), BigInt(1000000), BigInt("79307426338960776842885539845"));
      assert.equal(result, ZERO_BIG_INT);
    });

    it("handles edge case with minimum tick", () => {
      const result = getAmount0(-887272, 0, BigInt(-887272), BigInt(1000000), BigInt("4295128739"));
      assert(result > ZERO_BIG_INT, "Result should be greater than zero");
    });

    it("handles edge case with maximum tick", () => {
      const result = getAmount0(
        0,
        887272,
        BigInt(887272),
        BigInt(1000000),
        BigInt("1461446703485210103287273052203988822378723970342")
      );
      assert.equal(result, ZERO_BIG_INT);
    });
  });

  describe("getAmount1", () => {
    it("returns zero when current tick is below lower tick", () => {
      const result = getAmount1(-10, 10, BigInt(-20), BigInt(1000000), BigInt("79148977909814923576066331265"));
      assert.equal(result, ZERO_BIG_INT);
    });

    it("returns correct amount when current tick is between lower and upper tick", () => {
      const result = getAmount1(-10, 10, BigInt(0), BigInt(1000000), BigInt("79228162514264337593543950336"));
      assert(result > ZERO_BIG_INT, "Result should be greater than zero");
      assert(result < BigInt(1000000), "Result should be less than 1000000");
    });

    it("returns correct amount when current tick is above upper tick", () => {
      const result = getAmount1(-10, 10, BigInt(20), BigInt(1000000), BigInt("79307426338960776842885539845"));
      assert.equal(result, BigInt(1000));
    });

    it("handles edge case with minimum tick", () => {
      const result = getAmount1(-887272, 0, BigInt(-887272), BigInt(1000000), BigInt("4295128739"));
      assert.equal(result, ZERO_BIG_INT);
    });

    it("handles edge case with maximum tick", () => {
      const result = getAmount1(
        0,
        887272,
        BigInt(887272),
        BigInt(1000000),
        BigInt("1461446703485210103287273052203988822378723970342")
      );
      assert(result > ZERO_BIG_INT, "Result should be greater than zero");
    });
  });
});
