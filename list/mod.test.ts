import * as mod from "./mod.ts";
import * as asserts from "https://deno.land/std@0.183.0/testing/asserts.ts";

const array = [24, 1, 2, 3]
const list = [{ id: 1, name: "toto" }, { id: 2, name: "tata" }, { id: 3, name: "tutu" }, { id: 4, name: "titi" }]

Deno.test("findIndexOf", () => asserts.assertEquals(mod.findIndexOf(list, { id: 1 }), 0))

Deno.test("findOne", () => asserts.assertEquals(mod.findOne(list, { id: 1 }), { id: 1, name: "toto" }))

Deno.test("find", () => asserts.assertEquals(mod.find(list, { id: 1 }), [{ id: 1, name: "toto" }]))

// Deno.test("getFirst", () =>
//   asserts.assertEquals(mod.getFirst(list), { id: 1, name: "toto" }));

// Deno.test("getLast", () => {
//   const list = [{ id: 1, name: "toto" }, { id: 2, name: "tata" }, { id: 3, name: "tutu" }, { id: 4, name: "titi" }]
//   asserts.assertEquals(mod.getLast(list), { id: 4, name: "titi" })
// })

// Deno.test("getByIndex", () => asserts.assertEquals(mod.getByIndex(list, 0), { id: 1, name: "toto" }));

// Deno.test("get", () => asserts.assertEquals(mod.get(list, 0), { id: 1, name: "toto" }));

// console.log(list.findLast(i => i))
// console.log(list.find(i => i))
// console.log(list.findIndex(i => i))
console.log(list.findLastIndex(i => i))
