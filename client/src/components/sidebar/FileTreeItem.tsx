import type { AgentFileSummary } from "../../types/agent";

interface Props { file: AgentFileSummary; selectedFileId?: string; onFileSelect: (file: AgentFileSummary) => void; }

export default function FileTreeItem({ file, selectedFileId, onFileSelect }: Props) {
  return (
    <button className={`file-tree-item ${selectedFileId === file.id ? "file-tree-item-active" : ""}`} type="button" onClick={() => onFileSelect(file)} title={file.name} aria-current={selectedFileId === file.id ? "page" : undefined}>
      <span className={`file-type-icon file-type-icon-${file.fileType}`} aria-hidden="true">{file.fileType === "markdown" ? "MD" : "{}"}</span>
      <span className="file-tree-name">{file.name}</span>
    </button>
  );
}
