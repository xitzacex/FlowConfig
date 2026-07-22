import type { AgentFileSummary } from "../../types/agent";
import JsonEditor from "../json/JsonEditor"; import MarkdownEditor from "../markdown/MarkdownEditor";

interface Props { file: AgentFileSummary; content: string; onContentChange: (content: string) => void; onSave: () => void; onJsonValidityChange: (valid: boolean) => void; }
export default function FileEditor(props: Props) { return props.file.fileType === "markdown" ? <MarkdownEditor file={props.file} content={props.content} onContentChange={props.onContentChange} onSave={props.onSave} /> : <JsonEditor file={props.file} content={props.content} onContentChange={props.onContentChange} onSave={props.onSave} onValidityChange={props.onJsonValidityChange} />; }
