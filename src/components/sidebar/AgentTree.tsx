import { agents } from "../../data/agentRegistry";
import type { AgentFile } from "../../types/agent";
import AgentTreeItem from "./AgentTreeItem";

/*
 * AgentTree loops through the central registry and renders
 * one AgentTreeItem for each agent.
 */
interface AgentTreeProps {
  selectedFileId?: string;
  onFileSelect: (file: AgentFile) => void;
}

function AgentTree({
  selectedFileId,
  onFileSelect,
}: AgentTreeProps) {
  return (
    <div className="agent-tree">
      {/* .map() creates one reusable component for every agent. */}
      {agents.map((agent) => (
        <AgentTreeItem
          key={agent.id}
          agent={agent}
          selectedFileId={selectedFileId}
          onFileSelect={onFileSelect}
        />
      ))}
    </div>
  );
}

export default AgentTree;