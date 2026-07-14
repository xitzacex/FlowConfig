import EditorHeader from "../components/editor/EditorHeader";
import FileEditor from "../components/editor/FileEditor";
import type { AgentFile } from "../types/agent";

interface EditorPageProps {
  file: AgentFile;
}

// Builds the editor screen using the selected file.
function EditorPage({ file }: EditorPageProps) {
  return (
    <main className="editor-page">
      <EditorHeader file={file} />

      {/* The key makes React recreate the editor when a different file is selected. */}
      <FileEditor key={file.id} file={file} />
    </main>
  );
}

export default EditorPage;