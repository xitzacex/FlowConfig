import type { AgentFile } from "../../types/agent";
import JsonEditor from "../json/JsonEditor";
import MarkdownEditor from "../markdown/MarkdownEditor";

interface FileEditorProps {
  file: AgentFile;
}

// Chooses the editor based on the selected file type.
function FileEditor({ file }: FileEditorProps) {
  if (file.type === "markdown") {
    return <MarkdownEditor file={file} />;
  }

  return <JsonEditor file={file} />;
}

export default FileEditor;