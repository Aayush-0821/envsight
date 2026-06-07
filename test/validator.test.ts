import { describe, expect, test } from "vitest";
import { validateEnv } from "../src/validator";

describe("environment Validator", () => {
  test("Should detect missing variables", () => {
    process.env.TEST_KEY = "hello";
    const result = validateEnv({
      required: ["TEST_KEY", "MISSING_KEY"],
    });
    expect(result.success).toBe(false);
    expect(result.present).toContain("TEST_KEY");
    expect(result.missing).toContain("MISSING_KEY");
  });
});
