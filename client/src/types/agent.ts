export type FileType = "markdown" | "json";
export type SaveStatus = "saved" | "unsaved" | "saving" | "error";
export type EditorMode = "edit" | "preview" | "split";

export interface AgentFileSummary {
  id: string;
  agentId: string;
  name: string;
  fileType: FileType;
  relativePath: string;
  updatedAt?: string;
}

export interface AgentFileDetail extends AgentFileSummary {
  content: string;
  originalContent: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: string;
  version: string;
  files: AgentFileSummary[];
}

export interface UpdateFileRequest {
  content: string;
}

export interface UploadFileResult {
  file: AgentFileSummary;
  created: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// Compatibility aliases keep the domain language concise in existing callers.
export type AgentFile = AgentFileSummary;
export type AgentFileType = FileType;
