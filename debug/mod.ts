import "./deps.ts";

export const debug = {
  on: (): boolean => Deno.env.get('DEBUG')?.toLowerCase() === 'true',
  off: (): boolean => Deno.env.get('DEBUG')?.toLowerCase() === 'false',
}
