export interface JsonValidation {
  isValid: boolean;
  value?: unknown;
  error?: string;
  topLevelKeys: number;
}

export function validateJson(content: string): JsonValidation {
  try {
    const value: unknown = JSON.parse(content);
    const topLevelKeys = value !== null && typeof value === "object" ? Object.keys(value).length : 0;
    return { isValid: true, value, topLevelKeys };
  } catch (error) {
    const message = error instanceof SyntaxError ? error.message : "Unable to parse JSON.";
    return { isValid: false, error: message.replace(/^JSON\.parse:\s*/i, ""), topLevelKeys: 0 };
  }
}
