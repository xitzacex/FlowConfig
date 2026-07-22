import { useEffect, useRef, useState } from "react";
import type { Agent, AgentFileSummary } from "../../types/agent";
import { fileService } from "../../services/fileService";

interface Props { agents: Agent[]; onClose: () => void; onUploaded: (file: AgentFileSummary) => void; }
const MAX_SIZE = 2 * 1024 * 1024;

export default function UploadDialog({ agents, onClose, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null); const [agentId, setAgentId] = useState(agents[0]?.id ?? "");
  const [error, setError] = useState<string | null>(null); const [uploading, setUploading] = useState(false); const inputRef = useRef<HTMLInputElement>(null); const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { closeRef.current?.focus(); const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; document.addEventListener("keydown", handleKey); return () => document.removeEventListener("keydown", handleKey); }, [onClose]);
  function selectFile(next: File | undefined) {
    setError(null); setFile(next ?? null); if (!next) return;
    if (!/\.(md|markdown|json)$/i.test(next.name)) setError("Only .md, .markdown and .json files are supported.");
    else if (next.size === 0) setError("The selected file is empty.");
    else if (next.size > MAX_SIZE) setError("This file exceeds the 2 MB frontend limit.");
    else if (agents.find((agent) => agent.id === agentId)?.files.some((item) => item.name.toLowerCase() === next.name.toLowerCase())) setError("A file with this name already exists for this agent.");
  }
  async function upload() { if (!file || error) return; setUploading(true); try { const result = await fileService.uploadFile(file, agentId); onUploaded(result.file); } catch (cause) { setError(cause instanceof Error ? cause.message : "Upload failed."); setUploading(false); } }
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
    <div className="modal-header"><div><p className="eyebrow">Add configuration</p><h2 id="upload-title">Upload file</h2></div><button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="Close upload dialog">×</button></div>
    <label className="form-field"><span>Agent</span><select value={agentId} onChange={(event) => { setAgentId(event.target.value); setError(null); }}>{agents.map((agent) => <option key={agent.id} value={agent.id}>{agent.name}</option>)}</select></label>
    <div className="drop-zone" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); selectFile(event.dataTransfer.files[0]); }}><span className="upload-icon" aria-hidden="true">⇧</span><strong>Drop a Markdown or JSON file here</strong><span>or</span><button className="secondary-button" type="button" onClick={() => inputRef.current?.click()}>Choose file</button><input ref={inputRef} className="sr-only" type="file" accept=".md,.markdown,.json,application/json,text/markdown" onChange={(event) => selectFile(event.target.files?.[0])} /></div>
    {file && <div className="selected-upload"><div><strong>{file.name}</strong><span>{/\.json$/i.test(file.name) ? "JSON" : "Markdown"} · {(file.size / 1024).toFixed(1)} KB</span></div><button className="icon-button" type="button" onClick={() => selectFile(undefined)} aria-label="Remove selected file">×</button></div>}
    {error && <p className="inline-error" role="alert">{error}</p>}
    <div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="button" onClick={() => void upload()} disabled={!file || Boolean(error) || uploading}>{uploading ? "Uploading…" : "Upload file"}</button></div>
  </section></div>;
}
