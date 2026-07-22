import type { AgentFileDetail, AgentFileSummary, UpdateFileRequest, UploadFileResult } from "../types/agent";
import { apiRequest } from "./apiClient";

// This adapter is ready to replace the local service when the ASP.NET API is available.
export const fileApi = {
  listFiles: (signal?: AbortSignal) => apiRequest<AgentFileSummary[]>("/api/files", { signal }),
  getFile: (id: string, signal?: AbortSignal) => apiRequest<AgentFileDetail>(`/api/files/${encodeURIComponent(id)}`, { signal }),
  updateFile: (id: string, request: UpdateFileRequest) => apiRequest<AgentFileDetail>(`/api/files/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(request) }),
  uploadFile: (file: File, agentId?: string) => { const form = new FormData(); form.append("file", file); if (agentId) form.append("agentId", agentId); return apiRequest<UploadFileResult>("/api/files/upload", { method: "POST", body: form }); },
  deleteFile: (id: string) => apiRequest<void>(`/api/files/${encodeURIComponent(id)}`, { method: "DELETE" }),
};
