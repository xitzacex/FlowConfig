export interface MarkdownEditResult {
  content: string;
  selectionStart: number;
  selectionEnd: number;
}

export function wrapSelection(content: string, start: number, end: number, prefix: string, suffix = prefix, placeholder = "text"): MarkdownEditResult {
  const selected = content.slice(start, end) || placeholder;
  const replacement = `${prefix}${selected}${suffix}`;
  return {
    content: content.slice(0, start) + replacement + content.slice(end),
    selectionStart: start + prefix.length,
    selectionEnd: start + prefix.length + selected.length,
  };
}

function selectedLineRange(content: string, start: number, end: number) {
  const rangeStart = content.lastIndexOf("\n", start - 1) + 1;
  const breakAt = content.indexOf("\n", end);
  return { start: rangeStart, end: breakAt === -1 ? content.length : breakAt };
}

export function prefixSelectedLines(content: string, start: number, end: number, prefix: string | ((index: number) => string)): MarkdownEditResult {
  const range = selectedLineRange(content, start, end);
  const replacement = content.slice(range.start, range.end).split("\n").map((line, index) => `${typeof prefix === "function" ? prefix(index) : prefix}${line}`).join("\n");
  return { content: content.slice(0, range.start) + replacement + content.slice(range.end), selectionStart: range.start, selectionEnd: range.start + replacement.length };
}

export const numberSelectedLines = (content: string, start: number, end: number) => prefixSelectedLines(content, start, end, (index) => `${index + 1}. `);
export const insertAtLineStart = (content: string, cursor: number, prefix: string) => prefixSelectedLines(content, cursor, cursor, prefix);

export function insertBlock(content: string, start: number, end: number, before: string, after = "", placeholder = "content"): MarkdownEditResult {
  const selected = content.slice(start, end) || placeholder;
  const leading = start > 0 && content[start - 1] !== "\n" ? "\n" : "";
  const trailing = end < content.length && content[end] !== "\n" ? "\n" : "";
  const replacement = `${leading}${before}${selected}${after}${trailing}`;
  const innerStart = start + leading.length + before.length;
  return { content: content.slice(0, start) + replacement + content.slice(end), selectionStart: innerStart, selectionEnd: innerStart + selected.length };
}
