import "./deps.ts";

export const Debug = {
  on: (): boolean => Deno.env.get('DEBUG')?.toLowerCase() === 'true',
  off: (): boolean => !Debug.on(),
}
