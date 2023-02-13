export const File = {
  existFolder: (folder: string) => {
    try {
      Deno.readDirSync(folder);
    } catch (_error) {
      Deno.mkdirSync(folder);
    }
  }
}
