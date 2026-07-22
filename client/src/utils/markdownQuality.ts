export interface QualityCheck { id: string; label: string; status: "success" | "warning"; }

export function checkMarkdownQuality(content: string): QualityCheck[] {
  const text = content.trim();
  const words = text ? text.split(/\s+/).length : 0;
  return [
    { id: "content", label: text ? "File contains content" : "File is empty", status: text ? "success" : "warning" },
    { id: "headings", label: /^#{1,6}\s+.+/m.test(text) ? "Headings are present" : "No headings found", status: /^#{1,6}\s+.+/m.test(text) ? "success" : "warning" },
    { id: "output", label: /(^|\n)#{1,6}\s+output format\b/i.test(text) ? "Output Format section found" : "No Output Format section", status: /(^|\n)#{1,6}\s+output format\b/i.test(text) ? "success" : "warning" },
    { id: "examples", label: /\bexamples?\b/i.test(text) ? "Examples are included" : "No examples found", status: /\bexamples?\b/i.test(text) ? "success" : "warning" },
    { id: "todo", label: /\bTODO\b/i.test(text) ? "Contains unresolved TODO text" : "No TODO markers", status: /\bTODO\b/i.test(text) ? "warning" : "success" },
    { id: "length", label: words < 30 ? "Prompt is very short" : words > 5000 ? "Prompt is unusually long" : "Prompt length looks reasonable", status: words < 30 || words > 5000 ? "warning" : "success" },
  ];
}
