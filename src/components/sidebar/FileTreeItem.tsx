import type { AgentFile } from "../../types/agent";

/*
 * FileTreeItem displays one file and reports when
 * the user selects it.
 */
interface FileTreeItemProps {
  file: AgentFile;
  selectedFileId?: string;
  onFileSelect: (file: AgentFile) => void;
}

function FileTreeItem({
  file,
  selectedFileId,
  onFileSelect,
}: FileTreeItemProps) {
  // Compare IDs to work out whether this file is active.
  const isSelected = selectedFileId === file.id;

  // Markdown and JSON use different short labels.
  const fileTypeLabel = file.type === "markdown" ? "MD" : "{}";

  // Pass the selected file back up to AppLayout.
  function handleFileClick() {
    onFileSelect(file);
  }

  return (
    <button
      className={`file-tree-item ${
        isSelected ? "file-tree-item-active" : ""
      }`}
      type="button"
      onClick={handleFileClick}
    >
      <span
        className={`file-type-icon file-type-icon-${file.type}`}
        aria-hidden="true"
      >
        {fileTypeLabel}
      </span>

      <span className="file-tree-name">{file.name}</span>
    </button>
  );
}

export default FileTreeItem;