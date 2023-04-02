import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import * as mod from "./mod.ts";

Deno.test({
  name: "existFile",
  fn: async (t) => {
    await t.step("true", () => {
      test.assert(mod.existFile("file/mod.ts"))
    })
    if (mod.existFile("file/toto.ts")) Deno.removeSync("file/toto.ts")
    await t.step("false", () => {
      test.assertFalse(mod.existFile("file/toto.ts"))
    })
  },
})

Deno.test({
  name: "mustExistFile",
  fn: async (t) => {
    await t.step("!exist", () => {
      if (mod.existFile("file/toto.ts")) Deno.removeSync("file/toto.ts")
      test.assert(mod.mustExistFile("file/toto.ts"))
    })
    await t.step("exist", () => {
      test.assert(mod.mustExistFile("file/toto.ts"))
      if (mod.existFile("file/toto.ts")) Deno.removeSync("file/toto.ts")
    })
  }
})
