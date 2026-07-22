import type { Agent, AgentFileSummary } from "../../types/agent";
import AgentTreeItem from "./AgentTreeItem";

interface Props { agents: Agent[]; query: string; selectedFileId?: string; onFileSelect: (file: AgentFileSummary) => void; }

export default function AgentTree({ agents, query, selectedFileId, onFileSelect }: Props) {
  const term = query.trim().toLowerCase();
  const matches = agents.flatMap((agent) => {
    const agentMatches = agent.name.toLowerCase().includes(term);
    const files = !term || agentMatches ? agent.files : agent.files.filter((file) => file.name.toLowerCase().includes(term));
    return files.length ? [{ agent, files }] : [];
  });
  if (!matches.length) return <p className="sidebar-empty">No agents or files match “{query}”.</p>;
  return <div className="agent-tree">{matches.map(({ agent, files }) => <AgentTreeItem key={agent.id} agent={agent} files={files} selectedFileId={selectedFileId} forceExpanded={Boolean(term)} onFileSelect={onFileSelect} />)}</div>;
}
