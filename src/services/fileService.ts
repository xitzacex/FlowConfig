import { agents as sourceAgents } from "../data/agentRegistry";
import { loadAgentFileContent } from "../data/agentFileLoader";
import type { Agent, AgentFileDetail, AgentFileSummary, UpdateFileRequest, UploadFileResult } from "../types/agent";
import { clearSavedFileContent, getRecentFileIds, getSavedFileContent, getUploads, saveFileContent, saveRecentFileIds, saveUploads } from "../utils/fileStorage";

export interface FileService {
  listAgents(): Promise<Agent[]>;
  listFiles(): Promise<AgentFileSummary[]>;
  getFileById(id: string, signal?: AbortSignal): Promise<AgentFileDetail>;
  updateFile(id: string, request: UpdateFileRequest): Promise<AgentFileDetail>;
  uploadFile(file: File, agentId?: string): Promise<UploadFileResult>;
  resetFile(id: string): Promise<AgentFileDetail>;
  getRecentFiles(): Promise<AgentFileSummary[]>;
}

const cloneAgents = (): Agent[] => sourceAgents.map((agent) => ({ ...agent, files: [...agent.files] }));

function allAgents(): Agent[] {
  const result = cloneAgents();
  for (const upload of getUploads()) {
    const summary: AgentFileSummary = { id: upload.id, agentId: upload.agentId, name: upload.name, fileType: upload.fileType, relativePath: `${upload.agentId}/${upload.name}`, updatedAt: upload.updatedAt };
    const owner = result.find((agent) => agent.id === upload.agentId);
    if (owner) owner.files.push(summary);
  }
  return result;
}

function findSummary(id: string): AgentFileSummary | undefined {
  return allAgents().flatMap((agent) => agent.files).find((file) => file.id === id);
}

function originalContent(file: AgentFileSummary): string {
  const upload = getUploads().find((item) => item.id === file.id);
  return upload?.content ?? loadAgentFileContent(file.relativePath);
}

async function detail(id: string, signal?: AbortSignal): Promise<AgentFileDetail> {
  if (signal?.aborted) throw new DOMException("The request was cancelled.", "AbortError");
  const file = findSummary(id);
  if (!file) throw new Error("The requested file could not be found.");
  const original = originalContent(file);
  const saved = getSavedFileContent(id);
  saveRecentFileIds([id, ...getRecentFileIds().filter((recentId) => recentId !== id)]);
  return { ...file, originalContent: original, content: saved ?? original };
}

export const fileService: FileService = {
  async listAgents() { return allAgents(); },
  async listFiles() { return allAgents().flatMap((agent) => agent.files); },
  getFileById: detail,
  async updateFile(id, request) { saveFileContent(id, request.content); return detail(id); },
  async resetFile(id) { clearSavedFileContent(id); return detail(id); },
  async uploadFile(file, agentId) {
    const ownerId = agentId || sourceAgents[0]?.id;
    if (!ownerId || !sourceAgents.some((agent) => agent.id === ownerId)) throw new Error("Choose a valid agent.");
    const extension = file.name.split(".").pop()?.toLowerCase();
    const fileType = extension === "json" ? "json" : extension === "md" || extension === "markdown" ? "markdown" : null;
    if (!fileType) throw new Error("Only .md, .markdown and .json files are supported.");
    const content = await file.text();
    if (!content.trim()) throw new Error("The selected file is empty.");
    const uploads = getUploads();
    const duplicate = allAgents().flatMap((agent) => agent.files).some((item) => item.agentId === ownerId && item.name.toLowerCase() === file.name.toLowerCase());
    if (duplicate) throw new Error("A file with this name already exists for the selected agent.");
    const id = `upload-${ownerId}-${Date.now()}`;
    const updatedAt = new Date().toISOString();
    saveUploads([...uploads, { id, agentId: ownerId, name: file.name, fileType, content, updatedAt }]);
    return { created: true, file: { id, agentId: ownerId, name: file.name, fileType, relativePath: `${ownerId}/${file.name}`, updatedAt } };
  },
  async getRecentFiles() {
    const files = await this.listFiles();
    return getRecentFileIds().map((id) => files.find((file) => file.id === id)).filter((file): file is AgentFileSummary => Boolean(file));
  },
};
