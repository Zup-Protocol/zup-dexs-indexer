import assert from "assert";
import { getPoolTickSpacingFromParameters } from "../../../../../../src/v4-pools/mappings/pool-manager/dexs/pancakeswap-cl/pancakeswap-v4-cl-utils";

describe("pancakeswap-v4-cl-utils", () => {
  it(`'getPoolTickSpacingFromParameters' should return the right tick spacing
    from the parameters (starting at 16 byte and ending at 39)`, () => {
    let tickSpacing = getPoolTickSpacingFromParameters(
      "0x00000000000000000000000000000000000000000000000000000000000a0040"
    );

    assert.equal(tickSpacing, 10);
  });
});
