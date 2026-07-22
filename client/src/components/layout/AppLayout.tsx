import { useCallback, useEffect, useState } from "react";
import type { Agent, AgentFileSummary } from "../../types/agent";
import { fileService } from "../../services/fileService";
import EditorPage from "../../pages/EditorPage"; import HomePage from "../../pages/HomePage";
import UploadDialog from "../common/UploadDialog"; import Header from "./Header"; import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [agents, setAgents] = useState<Agent[]>([]); const [recent, setRecent] = useState<AgentFileSummary[]>([]); const [selected, setSelected] = useState<AgentFileSummary | null>(null);
  const [dirty, setDirty] = useState(false); const [uploadOpen, setUploadOpen] = useState(false); const [loading, setLoading] = useState(true); const [error, setError] = useState<string | null>(null);
  const refresh = useCallback(async () => { try { setAgents(await fileService.listAgents()); setRecent(await fileService.getRecentFiles()); setError(null); } catch (cause) { setError(cause instanceof Error ? cause.message : "Unable to load the workspace."); } finally { setLoading(false); } }, []);
  useEffect(() => { fileService.listAgents().then((loadedAgents) => { setAgents(loadedAgents); return fileService.getRecentFiles(); }).then((loadedRecent) => { setRecent(loadedRecent); setError(null); }).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Unable to load the workspace.")).finally(() => setLoading(false)); }, []);
  function canLeave() { return !dirty || window.confirm("Discard your unsaved changes?"); }
  function open(file: AgentFileSummary) { if (selected?.id === file.id || canLeave()) { setDirty(false); setSelected(file); } }
  function home() { if (canLeave()) { setDirty(false); setSelected(null); void refresh(); } }
  return <div className="app-layout"><Header /><div className="app-body"><Sidebar agents={agents} selectedFileId={selected?.id} isHome={!selected} onHome={home} onFileSelect={open} onUpload={() => setUploadOpen(true)} /><div className="app-content">
    {loading ? <div className="page-state" role="status"><span className="spinner" /> Loading workspace…</div> : error ? <div className="page-state error-state" role="alert"><h2>Unable to load FlowConfig</h2><p>{error}</p><button className="primary-button" type="button" onClick={() => void refresh()}>Try again</button></div> : selected ? <EditorPage key={selected.id} file={selected} agents={agents} onDirtyChange={setDirty} onSaved={() => void refresh()} /> : <HomePage agents={agents} recentFiles={recent} onOpen={open} onUpload={() => setUploadOpen(true)} />}
  </div></div>{uploadOpen && <UploadDialog agents={agents} onClose={() => setUploadOpen(false)} onUploaded={(file) => { setUploadOpen(false); void refresh(); open(file); }} />}</div>;
}
