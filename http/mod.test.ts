import * as test from "https://deno.land/std@0.181.0/testing/asserts.ts";
import * as mod from "./mod.ts";

Deno.test("fetch", async () => {
  const res = await mod.Http.fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json = await res.json();
  test.assert(res.ok);
  test.assert(json.id === 1);
  test.assert(res.status === 200);
})


Deno.test("fetchJson", async () => {
  const json = await mod.Http.fetchJson<{ id: number }>("https://jsonplaceholder.typicode.com/todos/1");
  test.assert(json.id === 1);
})

Deno.test("fetchJson test setCookie", async () => {
  const http = mod.Http;
  const json = await http.fetchJson<{ status: string }>("https://oc.damien-millet.dev/api/setcookie");
  test.assert(http.headers.get("cookie"))
})

