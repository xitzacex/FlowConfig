// This type limits file types to the two formats FlowConfig currently supports.
// Using a union type prevents accidental values such as "txt" or "pdf".
export type AgentFileType = "markdown" | "json";

// This interface describes one file belonging to an agent.
// Every file in the registry must follow this exact structure.
export interface AgentFile {
  // A unique ID used internally by React.
  // This should not contain spaces and should not be repeated.
  id: string;

  // The visible filename shown to the user in the sidebar.
  // Example: "system-prompt.md"
  name: string;

  // This tells the app which editor to use later.
  // Markdown files will use the Markdown editor.
  // JSON files will use the JSON editor.
  type: AgentFileType;

  // This records where the real file exists inside the agent data folders.
  // Example: "customer-support-agent/system-prompt.md"
  path: string;
}

// This interface describes one complete AI agent.
// Each agent has its own details and its own list of files.
export interface Agent {
  // A unique internal ID for the agent.
  // This will later help with selection and localStorage keys.
  id: string;

  // The name displayed in the sidebar and on the homepage.
  name: string;

  // A short explanation of what the agent is designed to do.
  description: string;

  // The current demo status of the agent.
  // We keep this simple for now rather than making a separate status type.
  status: string;

  // The version of the agent configuration.
  version: string;

  // The real files that belong to this agent.
  files: AgentFile[];
}