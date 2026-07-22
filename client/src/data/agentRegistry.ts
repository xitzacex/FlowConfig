import type { Agent } from "../types/agent";

export const agents: Agent[] = [
  {
    id: "customer-support-agent",
    name: "Customer Support Agent",
    description: "Answers customer questions and escalates complex cases to a human adviser.",
    status: "Draft",
    version: "1.0.0",
    files: [
      { id: "customer-support-system-prompt", agentId: "customer-support-agent", name: "system-prompt.md", fileType: "markdown", relativePath: "customer-support-agent/system-prompt.md" },
      { id: "customer-support-tone-guidelines", agentId: "customer-support-agent", name: "tone-guidelines.md", fileType: "markdown", relativePath: "customer-support-agent/tone-guidelines.md" },
      { id: "customer-support-config", agentId: "customer-support-agent", name: "config.json", fileType: "json", relativePath: "customer-support-agent/config.json" },
      { id: "customer-support-tools", agentId: "customer-support-agent", name: "tools.json", fileType: "json", relativePath: "customer-support-agent/tools.json" },
    ],
  },
  {
    id: "booking-assistant-agent",
    name: "Booking Assistant Agent",
    description: "Helps users arrange appointments and collect required booking information.",
    status: "Draft",
    version: "1.0.0",
    files: [
      { id: "booking-assistant-system-prompt", agentId: "booking-assistant-agent", name: "system-prompt.md", fileType: "markdown", relativePath: "booking-assistant-agent/system-prompt.md" },
      { id: "booking-assistant-booking-rules", agentId: "booking-assistant-agent", name: "booking-rules.md", fileType: "markdown", relativePath: "booking-assistant-agent/booking-rules.md" },
      { id: "booking-assistant-config", agentId: "booking-assistant-agent", name: "config.json", fileType: "json", relativePath: "booking-assistant-agent/config.json" },
      { id: "booking-assistant-output-schema", agentId: "booking-assistant-agent", name: "output-scheme.json", fileType: "json", relativePath: "booking-assistant-agent/output-scheme.json" },
    ],
  },
  {
    id: "fire-risk-smoke-prevention",
    name: "Fire Risk Smoke Prevention",
    description: "Reviews evidence relating to smoking facilities and non-smoking signage.",
    status: "Draft",
    version: "1.0.0",
    files: [
      { id: "fire-risk-smoke-prevention-prompt", agentId: "fire-risk-smoke-prevention", name: "smoke-prevention.md", fileType: "markdown", relativePath: "fire-risk-smoke-prevention/smoke-prevention.md" },
      { id: "fire-risk-smoke-prevention-config", agentId: "fire-risk-smoke-prevention", name: "config.json", fileType: "json", relativePath: "fire-risk-smoke-prevention/config.json" },
      { id: "fire-risk-smoke-prevention-output-fields", agentId: "fire-risk-smoke-prevention", name: "output-fields.json", fileType: "json", relativePath: "fire-risk-smoke-prevention/output-fields.json" },
      { id: "fire-risk-smoke-prevention-examples", agentId: "fire-risk-smoke-prevention", name: "examples.json", fileType: "json", relativePath: "fire-risk-smoke-prevention/examples.json" },
    ],
  },
];
