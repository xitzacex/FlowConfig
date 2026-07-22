import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { AgentFileSummary } from "../../types/agent";
import { validateJson } from "../../utils/jsonValidation";
import EditorToolBar from "../editor/EditorToolBar"; import JsonTree from "./JsonTree";

interface Props { file: AgentFileSummary; content: string; onContentChange: (content: string) => void; onSave: () => void; onValidityChange: (valid: boolean) => void; }

export default function JsonEditor({ file, content, onContentChange, onSave, onValidityChange }: Props) {
  const [view, setView] = useState<"code" | "tree">("code"); const undoStack = useRef<string[]>([]); const redoStack = useRef<string[]>([]); const validation = validateJson(content);
  useEffect(() => onValidityChange(validation.isValid), [onValidityChange, validation.isValid]);
  function update(next: string, record = true) { if (record && next !== content) { undoStack.current.push(content); if (undoStack.current.length > 100) undoStack.current.shift(); redoStack.current = []; } onContentChange(next); }
  function undo() { const previous = undoStack.current.pop(); if (previous !== undefined) { redoStack.current.push(content); update(previous, false); } }
  function redo() { const next = redoStack.current.pop(); if (next !== undefined) { undoStack.current.push(content); update(next, false); } }
  function transform(compact: boolean) { if (!validation.isValid) return; update(JSON.stringify(validation.value, null, compact ? undefined : 2)); }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) { const modifier = event.ctrlKey || event.metaKey; if (!modifier) return; const key = event.key.toLowerCase(); if (key === "s") { event.preventDefault(); onSave(); } else if (key === "z" && event.shiftKey || key === "y") { event.preventDefault(); redo(); } else if (key === "z") { event.preventDefault(); undo(); } }
  return <section className="file-editor-panel"><EditorToolBar rightContent={<div className={`json-status ${validation.isValid ? "json-status-valid" : "json-status-invalid"}`} role="status"><span aria-hidden="true">{validation.isValid ? "✓" : "!"}</span>{validation.isValid ? "Valid JSON" : "Invalid JSON"}</div>}>
    <button className={`toolbar-button ${view === "code" ? "toolbar-button-active" : ""}`} type="button" onClick={() => setView("code")}>Code</button><button className={`toolbar-button ${view === "tree" ? "toolbar-button-active" : ""}`} type="button" onClick={() => setView("tree")} disabled={!validation.isValid}>Tree</button><span className="toolbar-divider" />
    <button className="toolbar-button" type="button" onClick={() => transform(false)} disabled={!validation.isValid}>Format</button><button className="toolbar-button" type="button" onClick={() => transform(true)} disabled={!validation.isValid}>Minify</button><button className="toolbar-button" type="button" onClick={undo}>↶ Undo</button><button className="toolbar-button" type="button" onClick={redo}>↷ Redo</button>
  </EditorToolBar>{!validation.isValid && <p className="json-error" role="alert"><strong>Parse error:</strong> {validation.error}</p>}<div className="editor-workspace">{view === "code" ? <textarea className="file-textarea json-textarea" value={content} onChange={(event) => update(event.target.value)} onKeyDown={keyDown} spellCheck="false" aria-label={`Editing ${file.name}`} /> : <JsonTree value={validation.value} />}</div><footer className="editor-footer"><span>{content.length} characters</span><span>{validation.topLevelKeys} top-level {validation.topLevelKeys === 1 ? "key" : "keys"}</span></footer></section>;
}
