export const Filex = {
  existFolder: (folder: string) => {
    try {
      Deno.readDirSync(folder);
    } catch (_error) {
      Deno.mkdirSync(folder);
    }
  }
}
