import { useState } from "react";
import type { AgentFile } from "../../types/agent";

interface MarkdownEditorProps {
  file: AgentFile;
}

// Displays the Markdown toolbar and editable Markdown text.
function MarkdownEditor({ file }: MarkdownEditorProps) {
  // Temporary text changes depending on the selected file.
  const [content, setContent] = useState(
    `# ${file.name}

## Role

This is temporary Markdown content for:

${file.path}

## Instructions

- The real file content will be connected next.
- This editor can already be typed into.
`,
  );

  return (
    <section className="file-editor-panel">
      <div className="editor-toolbar">
        <div className="editor-toolbar-group">
          <button className="toolbar-button" type="button">
            Heading
          </button>

          <button className="toolbar-button" type="button">
            <strong>Bold</strong>
          </button>

          <button className="toolbar-button" type="button">
            <em>Italic</em>
          </button>

          <button className="toolbar-button" type="button">
            Bullet list
          </button>

          <button className="toolbar-button" type="button">
            Numbered list
          </button>

          <button className="toolbar-button" type="button">
            Quote
          </button>

          <button className="toolbar-button" type="button">
            Code
          </button>

          <button className="toolbar-button" type="button">
            Link
          </button>
        </div>

        <div className="editor-toolbar-group editor-view-controls">
          <button
            className="toolbar-button toolbar-button-active"
            type="button"
          >
            Edit
          </button>

          <button className="toolbar-button" type="button">
            Preview
          </button>

          <button className="toolbar-button" type="button">
            Split
          </button>
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

export default MarkdownEditor;