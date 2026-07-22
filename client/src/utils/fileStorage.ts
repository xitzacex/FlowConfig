const PREFIX = "flowconfig";

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(`${PREFIX}:${key}`);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
  } catch {
    throw new Error("Browser storage is unavailable or full.");
  }
}

export function getSavedFileContent(fileId: string): string | null {
  return read<string | null>(`file:${fileId}`, null);
}

export function saveFileContent(fileId: string, content: string): void {
  write(`file:${fileId}`, content);
}

export function clearSavedFileContent(fileId: string): void {
  try {
    localStorage.removeItem(`${PREFIX}:file:${fileId}`);
  } catch {
    throw new Error("Browser storage is unavailable.");
  }
}

export interface StoredUpload {
  id: string;
  agentId: string;
  name: string;
  fileType: "markdown" | "json";
  content: string;
  updatedAt: string;
}

export const getUploads = (): StoredUpload[] => read<StoredUpload[]>("uploads", []);
export const saveUploads = (uploads: StoredUpload[]): void => write("uploads", uploads);
export const getRecentFileIds = (): string[] => read<string[]>("recent", []);
export const saveRecentFileIds = (ids: string[]): void => write("recent", ids.slice(0, 6));
