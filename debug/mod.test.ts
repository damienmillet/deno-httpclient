import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import { debug } from "./mod.ts";

Deno.test("debug on", async (t) => {
  await t.step({
    name: "on",
    fn: () => {
      Deno.env.set("DEBUG", "true");
      test.assertFalse(debug.off())
      test.assert(debug.on())
    },
    sanitizeResources: false,
  })
  await t.step({
    name: "off",
    fn: () => {
      Deno.env.set("DEBUG", "false");
      test.assertFalse(debug.on())
      test.assert(debug.off())
    },
    sanitizeResources: false,
  })
});
