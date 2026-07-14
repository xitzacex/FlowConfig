import type { AgentFile } from "../../types/agent";

interface EditorHeaderProps {
  file: AgentFile;
}

// Shows the open filename, file details and main file actions.
function EditorHeader({ file }: EditorHeaderProps) {
  const readableType =
    file.type === "markdown" ? "Markdown" : "JSON";

  return (
    <header className="editor-file-header">
      <div className="editor-file-information">
        <h2>{file.name}</h2>

        <p>
          {readableType}
          <span aria-hidden="true"> • </span>
          {file.path}
        </p>
      </div>

      <div className="editor-header-actions">
        <button className="editor-action-button" type="button">
          Save
        </button>

        <button className="editor-action-button" type="button">
          Reset
        </button>

        <button
          className="editor-action-button editor-action-button-primary"
          type="button"
        >
          Export
        </button>
      </div>
    </header>
  );
}

export default EditorHeader;