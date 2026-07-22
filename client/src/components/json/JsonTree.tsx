import { useState } from "react";

function JsonNode({ name, value, depth = 0 }: { name?: string; value: unknown; depth?: number }) {
  const complex = value !== null && typeof value === "object"; const [open, setOpen] = useState(depth < 2);
  if (!complex) return <div className="tree-row" style={{ paddingLeft: depth * 18 }}><span className="tree-spacer" /><span className="tree-key">{name !== undefined && `${name}: `}</span><span className={`tree-value tree-${value === null ? "null" : typeof value}`}>{value === null ? "null" : typeof value === "string" ? `“${value}”` : String(value)}</span></div>;
  const entries = Object.entries(value as Record<string, unknown>); const array = Array.isArray(value); const bracket = array ? ["[", "]"] : ["{", "}"];
  return <div className="tree-node"><button className="tree-row tree-toggle" style={{ paddingLeft: depth * 18 }} type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open}><span>{entries.length ? open ? "▾" : "▸" : "·"}</span><span className="tree-key">{name !== undefined && `${name}: `}</span><span>{bracket[0]}{!open && entries.length ? ` … ${bracket[1]}` : entries.length === 0 ? bracket[1] : ""}</span><small>{entries.length} {array ? "items" : "keys"}</small></button>{open && <>{entries.map(([key, child]) => <JsonNode key={key} name={array ? key : key} value={child} depth={depth + 1} />)}<div className="tree-close" style={{ paddingLeft: depth * 18 }}>{bracket[1]}</div></>}</div>;
}

export default function JsonTree({ value }: { value: unknown }) { return <div className="json-tree" aria-label="JSON tree"><JsonNode value={value} /></div>; }
