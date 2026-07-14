import AgentTree from "../sidebar/AgentTree";
import type { AgentFile } from "../../types/agent";

/*
 * Sidebar shows the main navigation and passes file-selection
 * information down to the agent tree.
 */
interface SidebarProps {
  selectedFileId?: string;
  onFileSelect: (file: AgentFile) => void;
}

function Sidebar({
  selectedFileId,
  onFileSelect,
}: SidebarProps) {
  return (
    <aside className="app-sidebar">
      <nav className="sidebar-navigation">
        {/* This is only visual for now. We will connect Home navigation next. */}
        <button className="sidebar-link sidebar-link-active" type="button">
          Home
        </button>

        <div className="sidebar-section">
          <p className="sidebar-section-title">Agents</p>

          {/* The registry-driven agent tree handles agents and files. */}
          <AgentTree
            selectedFileId={selectedFileId}
            onFileSelect={onFileSelect}
          />
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;