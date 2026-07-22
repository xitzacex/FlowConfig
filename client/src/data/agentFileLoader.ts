/*
 * Vite finds every Markdown and JSON file inside the agents folder.
 *
 * query: "?raw" means the contents are imported as plain text.
 * eager: true loads the small demo files immediately when the app starts.
 */
const agentFiles = import.meta.glob("./agents/**/*.{md,json}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/*
 * Receives a path from agentRegistry.ts and returns the actual
 * text stored inside the matching .md or .json file.
 */
export function loadAgentFileContent(filePath: string): string {
  const fullPath = `./agents/${filePath}`;
  const fileContent = agentFiles[fullPath];

  // Throwing a clear error makes incorrect registry paths easier to debug. (uzair idea)
  if (fileContent === undefined) {
    throw new Error(`Agent file could not be found: ${fullPath}`);
  }

  return fileContent;
}