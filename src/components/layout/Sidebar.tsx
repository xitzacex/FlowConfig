import { useState } from "react";
import type { Agent, AgentFileSummary } from "../../types/agent";
import AgentTree from "../sidebar/AgentTree";

interface Props { agents: Agent[]; selectedFileId?: string; isHome: boolean; onHome: () => void; onFileSelect: (file: AgentFileSummary) => void; onUpload: () => void; }

export default function Sidebar({ agents, selectedFileId, isHome, onHome, onFileSelect, onUpload }: Props) {
  const [query, setQuery] = useState("");
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-navigation" aria-label="Workspace">
        <button className={`sidebar-link ${isHome ? "sidebar-link-active" : ""}`} type="button" onClick={onHome}><span aria-hidden="true">⌂</span> Home</button>
        <div className="sidebar-section">
          <div className="sidebar-section-heading"><p className="sidebar-section-title">Agents</p><span>{agents.length}</span></div>
          <label className="sidebar-search"><span className="sr-only">Filter agents and files</span><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Filter agents or files…" /></label>
          <AgentTree agents={agents} query={query} selectedFileId={selectedFileId} onFileSelect={onFileSelect} />
        </div>
      </nav>
      <button className="sidebar-upload" type="button" onClick={onUpload}><span aria-hidden="true">＋</span> Upload file</button>
    </aside>
  );
}
