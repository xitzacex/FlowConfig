import { useState } from "react";
import type { Agent, AgentFile } from "../../types/agent";
import FileTreeItem from "./FileTreeItem";

/*
 * AgentTreeItem displays one agent and controls whether
 * its file list is expanded or collapsed.
 */
interface AgentTreeItemProps {
  agent: Agent;
  selectedFileId?: string;
  onFileSelect: (file: AgentFile) => void;
}

function AgentTreeItem({
  agent,
  selectedFileId,
  onFileSelect,
}: AgentTreeItemProps) {
  // Each agent keeps its own open/closed state.
  const [isExpanded, setIsExpanded] = useState(false);

  // Flips the current state whenever the agent row is clicked.
  function handleToggleAgent() {
    setIsExpanded((previousValue) => !previousValue);
  }

  return (
    <div className="agent-tree-item">
      <button
        className="agent-tree-button"
        type="button"
        onClick={handleToggleAgent}
        aria-expanded={isExpanded}
      >
        <span className="agent-tree-arrow" aria-hidden="true">
          {isExpanded ? "▼" : "▶"}
        </span>

        <span className="agent-tree-name">{agent.name}</span>
      </button>

      {/* The files only render while this agent is expanded. */}
      {isExpanded && (
        <div className="agent-file-list">
          {agent.files.map((file) => (
            <FileTreeItem
              key={file.id}
              file={file}
              selectedFileId={selectedFileId}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AgentTreeItem;