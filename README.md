# FlowConfig

FlowConfig is a React and TypeScript workspace for browsing, editing, validating, uploading, and exporting AI-agent configuration files.

## Run locally

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

The running application uses the local mock service in `src/services/fileService.ts`. Source Markdown and JSON files remain unchanged; browser edits and uploaded demo files are stored behind the storage utility. The adapter in `src/api` is prepared for the future ASP.NET Core endpoints.

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` when the API adapter is connected. The local application does not require a backend.
