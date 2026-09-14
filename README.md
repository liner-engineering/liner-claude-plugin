# Liner Claude Plugin

Use Liner's OAuth-secured remote MCP server from Claude Code and Cowork for source-backed web search, scholar search, cited answers, and deep research workflows.

Liner provides AI-powered search APIs for applications that need fresh web context, academic retrieval, cited answers, and long-form research reports. This plugin bundles the production Liner MCP server and a small set of skills that help Claude choose the right Liner tool for the task.

## What This Plugin Adds

- A remote MCP server named `liner` at `https://platform.liner.com/api/v1/mcp`.
- OAuth login through Claude Code's MCP authentication flow.
- Workflow skills for source-backed answers, scholarly retrieval, and research briefs.

## Available MCP Tools

| Tool | Use it for |
| --- | --- |
| `search_web` | General web retrieval with titles, URLs, snippets, and source metadata. Takes `query` and optional `limit`. |
| `search_scholar` | Academic or scholarly retrieval from peer-reviewed sources. Takes `query` and optional `limit`. |
| `search_agent` | AI-augmented search agent that synthesizes a cited answer via iterative search. Takes a `messages` array. |
| `quick_answer_agent` | Short factual answers for quick lookups. Takes a `messages` array. |
| `deep_research_agent` | Highest-effort multi-step research for comprehensive investigations. Takes a `messages` array. |

All current Liner MCP tools are read-only: they retrieve or synthesize information and do not modify user data.

## Requirements

- Claude Code with plugin support.
- A Liner account with access to Liner MCP.

## Local Development Install

From a directory that contains this plugin:

```bash
claude --plugin-dir ./liner-claude-plugin
```

Inside Claude Code:

```text
/reload-plugins
/mcp
```

Confirm the `liner` MCP server appears, then choose the authentication option and complete the OAuth login in your browser. Claude Code stores and refreshes OAuth tokens securely. If tools do not appear after login, run `/reload-plugins` or restart Claude Code.

## Install in Cursor

This repository is also a Cursor plugin (`.cursor-plugin/plugin.json`). It bundles the same remote MCP server (`mcp.json`) and skills. After installing, open the Liner MCP server in Cursor and complete the OAuth login in your browser.

## Other MCP Clients

Any client that supports remote Streamable HTTP servers can connect to `https://platform.liner.com/api/v1/mcp`. See [`llms-install.md`](llms-install.md) for OAuth and API key setup.

## Example Prompts

```text
Use Liner to find recent AI search trends.
```

```text
Use Liner Scholar Search for retrieval augmented generation evaluation methods.
```

```text
Use Liner to create a concise source-backed brief on agentic search products.
```

## Included Skills

| Skill | Purpose |
| --- | --- |
| `liner:setup` | Check setup, MCP connection state, and available tools. |
| `liner:source-backed-answer` | Choose between `quick_answer_agent`, `search_agent`, and `search_web`. |
| `liner:research-brief` | Run multi-step research briefs with `deep_research_agent`. |
| `liner:scholar-search` | Use `search_scholar` for academic retrieval. |

## OAuth Notes

This plugin relies on Liner MCP OAuth discovery. The plugin intentionally does not ship an Authorization header or ask users for an API key.

When Claude Code connects without a token, Liner returns `401 Unauthorized` with a `WWW-Authenticate` header pointing to protected-resource metadata. Claude Code uses that metadata to discover `https://platform.liner.com/.well-known/oauth-authorization-server`, then starts the browser-based OAuth flow from `/mcp`.

Do not paste tokens or API keys into chat, commit them to this repository, or place them directly in `.mcp.json`.

## Claude Connectors Directory Status

Liner MCP advertises OAuth metadata, and every tool exposes `title`, `readOnlyHint: true`, `destructiveHint: false`, and `openWorldHint: true` (verified live 2026-06-10). The remaining pre-submission step is verifying OAuth login from Claude.ai and Claude Code with a fresh reviewer account.

See `CONNECTOR_DIRECTORY_DRAFT.md` for the submission draft and readiness checklist.

## Resources

- [Liner MCP docs](https://liner.com/developers/docs/mcp)
- [Liner Developers](https://liner.com/developers)
- [Liner API docs](https://liner.com/developers/docs)
- [Liner support](https://liner.com/support/form?source=developer)
- [Liner privacy policy](https://liner.com/privacy)
- [Liner API terms](https://liner.com/api-terms-of-service)

## License

Apache-2.0
