
export const existFolder = (folder: string) => {
  try {
    Deno.readDirSync(folder);
  } catch (_error) {
    Deno.mkdirSync(folder);
  }
}

export const existFile = (file: string) => {
  try {
    return Deno.readFileSync(file);
  } catch (_error) {
    Deno.writeFileSync(file, new Uint8Array());
  }
}
