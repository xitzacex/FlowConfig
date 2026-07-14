import { useState } from "react";
import type { AgentFile } from "../../types/agent";

import HomePage from "../../pages/HomePage";
import EditorPage from "../../pages/EditorPage";

import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  // Stores whichever file the user has selected in the sidebar.
  // Starts as null because no file is open when the app loads.
  const [selectedFile, setSelectedFile] = useState<AgentFile | null>(null);

  // Runs whenever a file is clicked in the sidebar.
  // Updating the state automatically refreshes the UI.
  function handleFileSelect(file: AgentFile) {
    setSelectedFile(file);
  }

  return (
    <div className="app-layout">

      <Header />

      <div className="app-body">

        {/* Pass the selected file ID so the sidebar can highlight it.
            Pass the callback so clicking a file updates selectedFile. */}
        <Sidebar
          selectedFileId={selectedFile?.id}
          onFileSelect={handleFileSelect}
        />

        <div className="app-content">

          {/* If a file has been selected, open the editor.
              Otherwise keep showing the homepage. */}
          {selectedFile ? (
            <EditorPage file={selectedFile} />
          ) : (
            <HomePage />
          )}

        </div>

      </div>

    </div>
  );
}

export default AppLayout;