
export function existFolder(folder: string): boolean {
  try {
    const stats = Deno.statSync(folder);
    return stats.isDirectory;
  } catch {
    return false;
  }
}

export function mustExistFolder(folder: string) {
  if (!existFolder(folder)) {
    Deno.mkdirSync(folder);
  }
}

export function existFile(file: string) {
  try {
    const stats = Deno.statSync(file);
    return stats.isFile;
  } catch {
    return false;
  }
}

export function mustExistFile(file: string) {
  if (!existFile(file)) {
    Deno.writeTextFileSync(file, "");
  }
}
