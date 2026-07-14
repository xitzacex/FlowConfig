/**
 * ------------------------------------------------------------
 * File: agentRegistry.ts
 *
 * Responsibility:
 * Stores metadata describing every demo agent and the files
 * belonging to each agent.
 *
 * It DOES:
 * - List all available agents.
 * - Store agent names, descriptions, versions and statuses.
 * - List the filename, file type and path for each real file.
 *
 * It DOES NOT:
 * - Store the actual Markdown file content.
 * - Store the actual JSON file content.
 * - Render any React interface.
 * - Open, edit or save files.
 *
 * Why this file exists:
 * The registry provides one central source of truth.
 * Components can read this data instead of hardcoding agent names
 * and filenames in several different places.
 * ------------------------------------------------------------
 */

// "import type" tells TypeScript that Agent is only being used
// for type checking and will not become part of the browser JavaScript.
import type { Agent } from "../types/agent";

/**
 * This exported array contains every demo agent.
 *
 * ": Agent[]" tells TypeScript:
 * - agents must be an array;
 * - every object inside the array must follow the Agent interface.
 *
 * "export" allows other files, such as AgentTree.tsx,
 * to import and use this registry.
 */
export const agents: Agent[] = [
  {
    /**
     * This ID is used internally.
     * Lowercase folder-style IDs are easy to use later for:
     * - localStorage keys;
     * - selected-agent state;
     * - file paths;
     * - searching.
     */
    id: "customer-support-agent",

    // This is the readable name displayed in the sidebar.
    name: "Customer Support Agent",

    // This description can later appear on the homepage or agent details panel.
    description:
      "Answers customer questions and escalates complex cases to a human adviser.",

    // This is demo metadata. It does not currently control any behaviour.
    status: "Draft",

    // This can later be shown in an agent details panel.
    version: "1.0.0",

    /**
     * This array describes the files belonging to the agent.
     *
     * Important:
     * These objects contain metadata only.
     * The real content remains inside the actual .md and .json files.
     */
    files: [
      {
        id: "customer-support-system-prompt",
        name: "system-prompt.md",
        type: "markdown",
        path: "customer-support-agent/system-prompt.md",
      },
      {
        id: "customer-support-tone-guidelines",
        name: "tone-guidelines.md",
        type: "markdown",
        path: "customer-support-agent/tone-guidelines.md",
      },
      {
        id: "customer-support-config",
        name: "config.json",
        type: "json",
        path: "customer-support-agent/config.json",
      },
      {
        id: "customer-support-tools",
        name: "tools.json",
        type: "json",
        path: "customer-support-agent/tools.json",
      },
    ],
  },

  {
    id: "booking-assistant-agent",
    name: "Booking Assistant Agent",
    description:
      "Helps users arrange appointments and collect the required booking information.",
    status: "Draft",
    version: "1.0.0",

    files: [
      {
        id: "booking-assistant-system-prompt",
        name: "system-prompt.md",
        type: "markdown",
        path: "booking-assistant-agent/system-prompt.md",
      },
      {
        id: "booking-assistant-booking-rules",
        name: "booking-rules.md",
        type: "markdown",
        path: "booking-assistant-agent/booking-rules.md",
      },
      {
        id: "booking-assistant-config",
        name: "config.json",
        type: "json",
        path: "booking-assistant-agent/config.json",
      },
      {
        id: "booking-assistant-output-schema",
        name: "output-schema.json",
        type: "json",
        path: "booking-assistant-agent/output-schema.json",
      },
    ],
  },

  {
    id: "fire-risk-smoke-prevention",
    name: "Fire Risk Smoke Prevention",
    description:
      "Reviews evidence relating to smoking facilities and non-smoking signage.",
    status: "Draft",
    version: "1.0.0",

    files: [
      {
        id: "fire-risk-smoke-prevention-prompt",
        name: "smoke-prevention.md",
        type: "markdown",
        path: "fire-risk-smoke-prevention/smoke-prevention.md",
      },
      {
        id: "fire-risk-smoke-prevention-config",
        name: "config.json",
        type: "json",
        path: "fire-risk-smoke-prevention/config.json",
      },
      {
        id: "fire-risk-smoke-prevention-output-fields",
        name: "output-fields.json",
        type: "json",
        path: "fire-risk-smoke-prevention/output-fields.json",
      },
      {
        id: "fire-risk-smoke-prevention-examples",
        name: "examples.json",
        type: "json",
        path: "fire-risk-smoke-prevention/examples.json",
      },
    ],
  },
];