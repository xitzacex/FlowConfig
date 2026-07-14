import { useState } from "react";
import type { AgentFile } from "../../types/agent";

interface JsonEditorProps {
  file: AgentFile;
}

// Displays JSON-specific controls and editable JSON text.
function JsonEditor({ file }: JsonEditorProps) {
  const [content, setContent] = useState(
    JSON.stringify(
      {
        fileName: file.name,
        filePath: file.path,
        status: "draft",
      },
      null,
      2,
    ),
  );

  return (
    <section className="file-editor-panel">
      <div className="editor-toolbar">
        <div className="editor-toolbar-group">
          <button
            className="toolbar-button toolbar-button-active"
            type="button"
          >
            Code
          </button>

          <button className="toolbar-button" type="button">
            Format JSON
          </button>

          <button className="toolbar-button" type="button">
            Minify JSON
          </button>

          <button className="toolbar-button" type="button">
            Tree view
          </button>
        </div>

        <div className="json-status json-status-valid">
          Valid JSON
        </div>
      </div>

      <textarea
        className="file-textarea"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        spellCheck="false"
        aria-label={`Editing ${file.name}`}
      />
    </section>
  );
}

export default JsonEditor;