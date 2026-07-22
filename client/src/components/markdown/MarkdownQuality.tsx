import { checkMarkdownQuality } from "../../utils/markdownQuality";

export default function MarkdownQuality({ content }: { content: string }) {
  const checks = checkMarkdownQuality(content); const warnings = checks.filter((check) => check.status === "warning").length;
  return <aside className="quality-panel"><details><summary><span>Quality checks</span><span className={warnings ? "quality-warning-count" : "quality-success-count"}>{warnings ? `${warnings} warnings` : "All clear"}</span></summary><ul>{checks.map((check) => <li key={check.id} className={`quality-${check.status}`}><span aria-hidden="true">{check.status === "success" ? "✓" : "!"}</span>{check.label}</li>)}</ul></details></aside>;
}
