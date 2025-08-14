import assert from "assert";
import { TickMath } from "../../../src/v4-pools/common/tick-math";

describe("TickMath", () => {
  it("MIN_TICK and MAX_TICK are correct", () => {
    assert.equal(TickMath.MIN_POOL_TICK as number, -887272);
    assert.equal(TickMath.MAX_POOL_TICK as number, 887272);
  });

  it("MIN_SQRT_RATIO and MAX_SQRT_RATIO are correct", () => {
    assert.equal(TickMath.MIN_POOL_SQRT_RATIO, BigInt("4295128739"));
    assert.equal(TickMath.MAX_POOL_SQRT_RATIO, BigInt("1461446703485210103287273052203988822378723970342"));
  });

  describe("getSqrtRatioAtTick", () => {
    it("returns the correct value for tick 0", () => {
      const result = TickMath.getSqrtRatioAtTick(0);
      assert.equal(result, BigInt("79228162514264337593543950336")); // 1.0000 in Q96
    });

    it("returns the correct value for tick 1", () => {
      const result = TickMath.getSqrtRatioAtTick(1);
      assert.equal(result, BigInt("79232123823359799118286999568")); // ~1.0001 in Q96
    });

    it("returns the correct value for tick -1", () => {
      const result = TickMath.getSqrtRatioAtTick(-1);
      assert.equal(result, BigInt("79224201403219477170569942574")); // ~0.9999 in Q96
    });

    it("returns the correct value for MIN_TICK", () => {
      const result = TickMath.getSqrtRatioAtTick(TickMath.MIN_POOL_TICK);
      assert.equal(result, TickMath.MIN_POOL_SQRT_RATIO);
    });

    it("returns the correct value for MAX_TICK", () => {
      const result = TickMath.getSqrtRatioAtTick(TickMath.MAX_POOL_TICK);
      assert.equal(result, TickMath.MAX_POOL_SQRT_RATIO);
    });

    it("returns the correct value for a large positive tick", () => {
      const result = TickMath.getSqrtRatioAtTick(887000);
      assert.equal(result, BigInt("1441706552580435738372324372445843561633831752204"));
    });

    it("returns the correct value for a large negative tick", () => {
      const result = TickMath.getSqrtRatioAtTick(-887000);
      assert.equal(result, BigInt("4353938549"));
    });
  });
});
