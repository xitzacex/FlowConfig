import { useCallback, useEffect, useState } from "react";
import type { Agent, AgentFileDetail, AgentFileSummary, SaveStatus } from "../types/agent";
import { fileService } from "../services/fileService";
import EditorHeader from "../components/editor/EditorHeader"; import FileEditor from "../components/editor/FileEditor";

interface Props { file: AgentFileSummary; agents: Agent[]; onDirtyChange: (dirty: boolean) => void; onSaved: () => void; }
export default function EditorPage({ file, agents, onDirtyChange, onSaved }: Props) {
  const [detail, setDetail] = useState<AgentFileDetail | null>(null); const [content, setContent] = useState(""); const [savedContent, setSavedContent] = useState(""); const [status, setStatus] = useState<SaveStatus>("saved"); const [error, setError] = useState<string | null>(null); const [jsonValid, setJsonValid] = useState(true);
  const dirty = detail !== null && content !== savedContent;
  useEffect(() => { const controller = new AbortController(); fileService.getFileById(file.id, controller.signal).then((loaded) => { setDetail(loaded); setContent(loaded.content); setSavedContent(loaded.content); }).catch((cause: unknown) => { if (!(cause instanceof DOMException && cause.name === "AbortError")) setError(cause instanceof Error ? cause.message : "Unable to open this file."); }); return () => controller.abort(); }, [file.id]);
  useEffect(() => { onDirtyChange(dirty); }, [dirty, onDirtyChange]);
  useEffect(() => { const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); }; window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn); }, [dirty]);
  const save = useCallback(async () => { if (!dirty || status === "saving" || (file.fileType === "json" && !jsonValid)) return; setStatus("saving"); try { const updated = await fileService.updateFile(file.id, { content }); setSavedContent(updated.content); setStatus("saved"); onSaved(); } catch (cause) { setStatus("error"); setError(cause instanceof Error ? cause.message : "The file could not be saved."); } }, [content, dirty, file.fileType, file.id, jsonValid, onSaved, status]);
  async function reset() { if (dirty && !window.confirm("Reset this file and discard your unsaved changes?")) return; try { const restored = await fileService.resetFile(file.id); setDetail(restored); setContent(restored.content); setSavedContent(restored.content); setError(null); } catch (cause) { setError(cause instanceof Error ? cause.message : "The file could not be reset."); } }
  function exportFile() { const extension = file.fileType === "json" ? ".json" : ".md"; const base = file.name.replace(/\.(md|markdown|json)$/i, ""); const blob = new Blob([content], { type: file.fileType === "json" ? "application/json;charset=utf-8" : "text/markdown;charset=utf-8" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = `${base}${extension}`; link.click(); URL.revokeObjectURL(url); }
  if (!detail && !error) return <div className="page-state" role="status"><span className="spinner" /> Loading {file.name}…</div>;
  if (!detail) return <div className="page-state error-state" role="alert"><h2>Unable to open file</h2><p>{error}</p></div>;
  const visibleStatus: SaveStatus = status === "saving" || status === "error" ? status : dirty ? "unsaved" : "saved";
  return <main className="editor-page"><EditorHeader file={file} agent={agents.find((agent) => agent.id === file.agentId)} status={visibleStatus} canSave={dirty && status !== "saving" && (file.fileType !== "json" || jsonValid)} onSave={() => void save()} onReset={() => void reset()} onExport={exportFile} />{error && status === "error" && <p className="save-error" role="alert">{error}</p>}<FileEditor file={file} content={content} onContentChange={(next) => { setContent(next); if (status === "error") setStatus("unsaved"); }} onSave={() => void save()} onJsonValidityChange={setJsonValid} /></main>;
}
