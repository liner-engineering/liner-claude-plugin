# Liner Search & Research

Accurate, cited web and academic search plus deep research inside GitHub Copilot agent mode. This extension connects VS Code to Liner's remote MCP server, so you can ask Copilot to research while you code and get answers with sources.

## What you get

Five read-only tools from the Liner MCP server:

| Tool | Use it for |
| --- | --- |
| `search_web` | Real-time web results with titles, URLs, and snippets |
| `search_scholar` | Peer-reviewed and scholarly sources |
| `quick_answer_agent` | Short factual answers with citations |
| `search_agent` | Richer cited answers built from several searches |
| `deep_research_agent` | Multi-step research reports |

## Get started

1. Install this extension.
2. Open Copilot Chat and switch to **Agent** mode.
3. Open the tools picker and make sure **Liner** is enabled.
4. On the first call, VS Code asks you to sign in to Liner in your browser. Approve access and you're done. No API key to paste.

You can check or remove the connection anytime from the **Accounts** menu or the **MCP: List Servers** command.

## Example prompts

- "Use Liner to find recent peer-reviewed papers on retrieval-augmented generation evaluation and summarize their methods."
- "Use Liner to check the latest release notes of this library and list breaking changes, with sources."
- "Use Liner deep research to write a brief on AI search APIs, with a citation for every claim."

## Requirements

- VS Code 1.101 or later
- GitHub Copilot Chat with agent mode
- A Liner account (created during sign-in if you don't have one)

## Prefer an API key?

If you can't use browser sign-in, add the server to `.vscode/mcp.json` yourself and send a Liner API key as a bearer token. See the [Liner MCP docs](https://liner.com/developers/docs/mcp).

## Links

- Docs: https://liner.com/developers/docs/mcp
- Privacy: https://liner.com/privacy
- Terms: https://liner.com/terms
