export function parseFavoriteIds(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

const STORAGE_KEY = "masterpath-favorites";
const EMPTY_SNAPSHOT = "[]";

let listeners: Array<() => void> = [];
let memorySnapshot: string | null = null;

function notify(): void {
  for (const listener of listeners) listener();
}

export function subscribeFavorites(listener: () => void): () => void {
  listeners = [...listeners, listener];
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      memorySnapshot = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((item) => item !== listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function getFavoritesSnapshot(): string {
  if (memorySnapshot !== null) return memorySnapshot;
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT;
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

export function getFavoritesServerSnapshot(): string {
  return EMPTY_SNAPSHOT;
}

export function writeFavorites(ids: string[]): void {
  const serialized = JSON.stringify(ids);
  try {
    window.localStorage.setItem(STORAGE_KEY, serialized);
    memorySnapshot = null;
  } catch {
    // Storage can be unavailable (private mode, quota); keep the value in memory.
    memorySnapshot = serialized;
  }
  notify();
}
