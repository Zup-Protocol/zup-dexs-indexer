import assert from "assert";
import { BigDecimal } from "generated";
import { ZERO_BIG_DECIMAL } from "../../src/common/constants";
import { hexToBigInt, mulDivRoundingUp, safeDiv } from "../../src/common/math";

describe("Math", () => {
  it("When passing the `b` param as zero in safeDiv, instead of throwing, it should return zero", () => {
    const a = BigDecimal("1");
    const b = BigDecimal("0");

    const result = safeDiv(a, b);

    assert.equal(result.toString(), ZERO_BIG_DECIMAL.toString());
  });

  it("When passing the `a` and `b` param as non zero in safeDiv, it should simply divide them", () => {
    const a = BigDecimal("10");
    const b = BigDecimal("2");

    const result = safeDiv(a, b);

    assert.equal(result.toString(), BigDecimal("5").toString());
  });

  it("when passing a hex, it should converts hex string to BigInt", () => {
    assert.equal(hexToBigInt("0x10").toString(), BigInt(16).toString());
  });

  it("mulDivRoundingUp rounds up when remainder exists", () => {
    const a = BigInt(10);
    const b = BigInt(10);
    const denominator = BigInt(3);

    assert.equal(mulDivRoundingUp(a, b, denominator), 34);
  });

  it("mulDivRoundingUp does not round up when no remainder", () => {
    const a = BigInt(12);
    const b = BigInt(10);
    const denominator = BigInt(4);

    assert.equal(mulDivRoundingUp(a, b, denominator), 30);
  });
});
