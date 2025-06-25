const assert = require("assert");

describe("Basic Sanity Test", function() {
  it("should add numbers correctly", function() {
    assert.strictEqual(1 + 1, 2);
  });

  it("should check string equality", function() {
    assert.strictEqual("hybe".toUpperCase(), "HYBE");
  });
});
