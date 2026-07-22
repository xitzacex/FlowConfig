import { useState } from "react";
import type { Agent, AgentFileSummary } from "../../types/agent";
import FileTreeItem from "./FileTreeItem";

interface Props { agent: Agent; files: AgentFileSummary[]; selectedFileId?: string; forceExpanded: boolean; onFileSelect: (file: AgentFileSummary) => void; }

export default function AgentTreeItem({ agent, files, selectedFileId, forceExpanded, onFileSelect }: Props) {
  const [expanded, setExpanded] = useState(files.some((file) => file.id === selectedFileId));
  const isExpanded = forceExpanded || expanded || files.some((file) => file.id === selectedFileId);
  return (
    <div className="agent-tree-item">
      <button className="agent-tree-button" type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={isExpanded}>
        <span className="agent-tree-arrow" aria-hidden="true">{isExpanded ? "▾" : "▸"}</span>
        <span className="agent-tree-name" title={agent.name}>{agent.name}</span><span className="agent-file-count">{agent.files.length}</span>
      </button>
      {isExpanded && <div className="agent-file-list">{files.map((file) => <FileTreeItem key={file.id} file={file} selectedFileId={selectedFileId} onFileSelect={onFileSelect} />)}</div>}
    </div>
  );
}
