import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Global styles
import "./styles/global.css";

// Overall page layout
import "./styles/layout.css";

// Main application UI
import "./styles/header.css";
import "./styles/sidebar.css";

// Individual pages
import "./styles/home.css";
import "./styles/editor.css";

// File-specific styling
import "./styles/markdown.css";
import "./styles/json.css";

// Shared reusable components
import "./styles/common.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);