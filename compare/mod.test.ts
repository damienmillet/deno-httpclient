import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import * as mod from "./mod.ts";

Deno.test("is upper",
  async (t) => {
    await t.step("more", () => test.assert(mod.upper(3, 2)));
    await t.step("less", () => test.assertFalse(mod.upper(1, 2)));
    await t.step("even", () => test.assertFalse(mod.upper(2, 2)));
  }
)

Deno.test("is same",
  async (t) => {
    await t.step("more", () => test.assertFalse(mod.same(3, 2)));
    await t.step("less", () => test.assertFalse(mod.same(1, 2)));
    await t.step("even", () => test.assert(mod.same(2, 2)));
  }
)

Deno.test("is equal",
  async (t) => {
    await t.step("more", () => test.assertFalse(mod.equal(3, 2)));
    await t.step("less", () => test.assertFalse(mod.equal(1, 2)));
    await t.step("even", () => test.assert(mod.equal(2, 2)));
  }
)

Deno.test("is lower",
  async (t) => {
    await t.step("more", () => test.assertFalse(mod.lower(3, 2)));
    await t.step("less", () => test.assert(mod.lower(1, 2)));
    await t.step("even", () => test.assertFalse(mod.lower(2, 2)));
  }
)

Deno.test("is upper or same",
  async (t) => {
    await t.step("more", () => test.assert(mod.upperOrSame(3, 2)));
    await t.step("less", () => test.assertFalse(mod.upperOrSame(1, 2)));
    await t.step("even", () => test.assert(mod.upperOrSame(2, 2)));
  }
)

Deno.test("is lower or same",
  async (t) => {
    await t.step("more", () => test.assertFalse(mod.lowerOrSame(3, 2)));
    await t.step("less", () => test.assert(mod.lowerOrSame(1, 2)));
    await t.step("even", () => test.assert(mod.lowerOrSame(2, 2)));
  }
)

Deno.test("is upper or equal",
  async (t) => {
    await t.step("more", () => test.assert(mod.upperOrEqual(3, 2)));
    await t.step("less", () => test.assertFalse(mod.upperOrEqual(1, 2)));
    await t.step("even", () => test.assert(mod.upperOrEqual(2, 2)));
  }
)

Deno.test("is lower or equal",
  async (t) => {
    await t.step("more", () => test.assertFalse(mod.lowerOrEqual(3, 2)));
    await t.step("less", () => test.assert(mod.lowerOrEqual(1, 2)));
    await t.step("even", () => test.assert(mod.lowerOrEqual(2, 2)));
  }
)
