import { useRef, useState, type KeyboardEvent } from "react";
import type { AgentFileSummary, EditorMode } from "../../types/agent";
import { insertAtLineStart, insertBlock, numberSelectedLines, prefixSelectedLines, wrapSelection, type MarkdownEditResult } from "../../utils/markdownFormatter";
import EditorToolBar from "../editor/EditorToolBar"; import MarkdownPreview from "./MarkdownPreview"; import MarkdownQuality from "./MarkdownQuality";

interface Props { file: AgentFileSummary; content: string; onContentChange: (content: string) => void; onSave: () => void; }

function ToolButton({ label, title, onClick }: { label: string; title: string; onClick: () => void }) {
  return <button className="toolbar-button" type="button" title={title} onClick={onClick}>{label}</button>;
}

export default function MarkdownEditor({ file, content, onContentChange, onSave }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); const undoStack = useRef<string[]>([]); const redoStack = useRef<string[]>([]); const [mode, setMode] = useState<EditorMode>("edit");
  const words = content.trim() ? content.trim().split(/\s+/).length : 0; const headings = content.match(/^#{1,6}\s+/gm)?.length ?? 0;
  function update(next: string, record = true) { if (record && next !== content) { undoStack.current.push(content); if (undoStack.current.length > 100) undoStack.current.shift(); redoStack.current = []; } onContentChange(next); }
  function apply(result: MarkdownEditResult) { update(result.content); requestAnimationFrame(() => { textareaRef.current?.focus(); textareaRef.current?.setSelectionRange(result.selectionStart, result.selectionEnd); }); }
  function selection(action: (start: number, end: number) => MarkdownEditResult) { const area = textareaRef.current; if (area) apply(action(area.selectionStart, area.selectionEnd)); }
  function undo() { const previous = undoStack.current.pop(); if (previous !== undefined) { redoStack.current.push(content); update(previous, false); } }
  function redo() { const next = redoStack.current.pop(); if (next !== undefined) { undoStack.current.push(content); update(next, false); } }
  function keyDown(event: KeyboardEvent<HTMLTextAreaElement>) { const modifier = event.ctrlKey || event.metaKey; if (!modifier) return; const key = event.key.toLowerCase(); if (key === "b" || key === "i") { event.preventDefault(); selection((start, end) => wrapSelection(content, start, end, key === "b" ? "**" : "*")); } else if (key === "s") { event.preventDefault(); onSave(); } else if (key === "z" && event.shiftKey || key === "y") { event.preventDefault(); redo(); } else if (key === "z") { event.preventDefault(); undo(); } }
  const heading = () => selection((start) => insertAtLineStart(content, start, "## "));
  const bold = () => selection((start, end) => wrapSelection(content, start, end, "**"));
  const italic = () => selection((start, end) => wrapSelection(content, start, end, "*"));
  const bullets = () => selection((start, end) => prefixSelectedLines(content, start, end, "- "));
  const numbers = () => selection((start, end) => numberSelectedLines(content, start, end));
  const quote = () => selection((start, end) => prefixSelectedLines(content, start, end, "> "));
  const inlineCode = () => selection((start, end) => wrapSelection(content, start, end, "`", "`", "code"));
  const codeBlock = () => selection((start, end) => insertBlock(content, start, end, "```\n", "\n```", "code"));
  const link = () => selection((start, end) => wrapSelection(content, start, end, "[", "](https://example.com)", "link text"));
  const table = () => selection((start, end) => insertBlock(content, start, end, "", "", "| Column 1 | Column 2 |\n| --- | --- |\n| Value | Value |"));
  return <section className="file-editor-panel"><EditorToolBar rightContent={<div className="view-switch" aria-label="Markdown view">{(["edit", "preview", "split"] as EditorMode[]).map((view) => <button key={view} className={`toolbar-button ${mode === view ? "toolbar-button-active" : ""}`} type="button" onClick={() => setMode(view)}>{view[0].toUpperCase() + view.slice(1)}</button>)}</div>}>
    <ToolButton label="H" title="Heading" onClick={heading} /><ToolButton label="B" title="Bold (Ctrl+B)" onClick={bold} /><ToolButton label="I" title="Italic (Ctrl+I)" onClick={italic} /><ToolButton label="• List" title="Bullet list" onClick={bullets} /><ToolButton label="1. List" title="Numbered list" onClick={numbers} /><ToolButton label="❞" title="Quote" onClick={quote} /><ToolButton label="&lt;&gt; inline" title="Inline code" onClick={inlineCode} /><ToolButton label="Code block" title="Fenced code block" onClick={codeBlock} /><ToolButton label="Link" title="Link" onClick={link} /><ToolButton label="Table" title="Insert table" onClick={table} /><ToolButton label="↶" title="Undo" onClick={undo} /><ToolButton label="↷" title="Redo" onClick={redo} />
  </EditorToolBar><div className={`editor-workspace mode-${mode}`}>{mode !== "preview" && <textarea ref={textareaRef} className="file-textarea markdown-textarea" value={content} onChange={(event) => update(event.target.value)} onKeyDown={keyDown} spellCheck="true" aria-label={`Editing ${file.name}`} />}{mode !== "edit" && <MarkdownPreview content={content} />}</div><footer className="editor-footer"><span>{words} words</span><span>{content.length} characters</span><span>~{Math.ceil(content.length / 4)} tokens</span><span>{headings} headings</span></footer><MarkdownQuality content={content} /></section>;
}
