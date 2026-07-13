export function hashToPath(hash: string): string | null {
  return hash.startsWith("#/") ? hash.slice(1) : null;
}
