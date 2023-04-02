import "https://deno.land/std@0.182.0/dotenv/load.ts";

export const debug = {
  on: (): boolean => Deno.env.get('DEBUG')?.toLowerCase() === 'true',
  off: (): boolean => Deno.env.get('DEBUG')?.toLowerCase() === 'false',
}
