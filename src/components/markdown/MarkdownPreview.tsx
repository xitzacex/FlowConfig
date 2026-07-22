import { Fragment, type ReactNode } from "react";

interface Props { content: string; }

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g);
  return tokens.map((token, index) => {
    if (/^`.+`$/.test(token)) return <code key={index}>{token.slice(1, -1)}</code>;
    if (/^\*\*.+\*\*$/.test(token)) return <strong key={index}>{token.slice(2, -2)}</strong>;
    if (/^\*.+\*$/.test(token)) return <em key={index}>{token.slice(1, -1)}</em>;
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) { const safe = /^(https?:|mailto:|\/|#)/i.test(link[2]) ? link[2] : "#"; return <a key={index} href={safe} target={safe.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{link[1]}</a>; }
    return <Fragment key={index}>{token}</Fragment>;
  });
}

// A deliberately small renderer treats raw HTML as text and supports common prompt Markdown.
export default function MarkdownPreview({ content }: Props) {
  const lines = content.replace(/\r/g, "").split("\n"); const nodes: ReactNode[] = []; let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (line.startsWith("```")) { const language = line.slice(3); const code: string[] = []; index++; while (index < lines.length && !lines[index].startsWith("```")) code.push(lines[index++]); index++; nodes.push(<pre key={nodes.length}><code data-language={language}>{code.join("\n")}</code></pre>); continue; }
    const heading = line.match(/^(#{1,6})\s+(.+)$/); if (heading) { const level = heading[1].length; const Tag = `h${level}` as keyof React.JSX.IntrinsicElements; nodes.push(<Tag key={nodes.length}>{inline(heading[2])}</Tag>); index++; continue; }
    if (/^\s*([-*_])\1\1+\s*$/.test(line)) { nodes.push(<hr key={nodes.length} />); index++; continue; }
    if (/^>\s?/.test(line)) { const quotes: string[] = []; while (index < lines.length && /^>\s?/.test(lines[index])) quotes.push(lines[index++].replace(/^>\s?/, "")); nodes.push(<blockquote key={nodes.length}>{quotes.map((item, quoteIndex) => <p key={quoteIndex}>{inline(item)}</p>)}</blockquote>); continue; }
    if (/^[-*+]\s+/.test(line)) { const items: string[] = []; while (index < lines.length && /^[-*+]\s+/.test(lines[index])) items.push(lines[index++].replace(/^[-*+]\s+/, "")); nodes.push(<ul key={nodes.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ul>); continue; }
    if (/^\d+\.\s+/.test(line)) { const items: string[] = []; while (index < lines.length && /^\d+\.\s+/.test(lines[index])) items.push(lines[index++].replace(/^\d+\.\s+/, "")); nodes.push(<ol key={nodes.length}>{items.map((item, itemIndex) => <li key={itemIndex}>{inline(item)}</li>)}</ol>); continue; }
    if (line.includes("|") && index + 1 < lines.length && /^\s*\|?\s*:?-+/.test(lines[index + 1])) { const headers = line.split("|").filter(Boolean).map((cell) => cell.trim()); index += 2; const rows: string[][] = []; while (index < lines.length && lines[index].includes("|")) rows.push(lines[index++].split("|").filter(Boolean).map((cell) => cell.trim())); nodes.push(<table key={nodes.length}><thead><tr>{headers.map((cell) => <th key={cell}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table>); continue; }
    if (!line.trim()) { index++; continue; }
    const paragraph: string[] = [line]; index++; while (index < lines.length && lines[index].trim() && !/^(#{1,6})\s|^```|^>|^[-*+]\s+|^\d+\.\s+/.test(lines[index])) paragraph.push(lines[index++]); nodes.push(<p key={nodes.length}>{inline(paragraph.join(" "))}</p>);
  }
  return <article className="markdown-preview">{nodes.length ? nodes : <p className="preview-empty">Nothing to preview yet.</p>}</article>;
}
