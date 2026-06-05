# Liner Claude Plugin

Use Liner's remote MCP server from Claude Code and Cowork for source-backed web search, scholar search, cited answers, and deep research workflows.

Liner provides AI-powered search APIs for applications that need fresh web context, academic retrieval, cited answers, and long-form research reports. This plugin bundles the production Liner MCP server and a small set of skills that help Claude choose the right Liner tool for the task.

## What This Plugin Adds

- A remote MCP server named `liner` at `https://platform.liner.com/api/v1/mcp`.
- Secure setup for your Liner API key through Claude Code plugin configuration.
- Workflow skills for source-backed answers, scholarly retrieval, and research briefs.

## Available MCP Tools

| Tool | Use it for |
| --- | --- |
| `search_web` | General web retrieval with titles, URLs, snippets, and source metadata. |
| `search_scholar` | Academic or scholarly retrieval. |
| `quick_answer` | Short factual lookups and low-latency source-backed answers. |
| `ai_search` | Concise cited answers for product, market, or technical questions. |
| `ai_search_pro` | Higher-quality cited answers for harder or more nuanced questions. |
| `deep_research` | Multi-step research briefs. |
| `deep_research_pro` | Highest-effort research for difficult topics. |

All current Liner MCP tools are read-only: they retrieve or synthesize information and do not modify user data.

## Requirements

- Claude Code with plugin support.
- A Liner API key from the Liner Developer Platform.

## Local Development Install

From a directory that contains this plugin:

```bash
claude --plugin-dir ./liner-claude-plugin
```

When prompted, enter your Liner API key in the plugin configuration. Claude Code stores the value as a sensitive plugin setting. Inside Claude Code:

```text
/reload-plugins
/mcp
```

Confirm the `liner` MCP server appears and is connected. If tools do not appear, restart Claude Code after saving the plugin configuration.

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
| `liner:setup` | Check setup, environment variables, MCP connection state, and available tools. |
| `liner:source-backed-answer` | Choose between `quick_answer`, `ai_search`, and `ai_search_pro`. |
| `liner:research-brief` | Choose between `deep_research` and `deep_research_pro`. |
| `liner:scholar-search` | Use `search_scholar` for academic retrieval. |

## Authentication Notes

This plugin uses the current Liner MCP API-key flow. Claude Code stores the key as a sensitive plugin configuration value and injects it into the MCP Authorization header:

```json
{
  "Authorization": "Bearer ${user_config.api_key}"
}
```

Do not paste real API keys into chat, commit them to this repository, or place them directly in `.mcp.json`.

## Claude Connectors Directory Status

This plugin is intended for Claude Code and Cowork distribution first. A reviewed Claude Connectors Directory listing for all Claude surfaces should be held until Liner has an OAuth-compatible connector auth path or Anthropic-approved custom connection support. Static user-pasted bearer tokens are not currently supported for reviewed authenticated connectors.

See `CONNECTOR_DIRECTORY_DRAFT.md` for the held submission draft and blocker checklist.

## Resources

- [Liner MCP docs](https://liner.com/developers/docs/mcp)
- [Liner Developers](https://liner.com/developers)
- [Liner API docs](https://liner.com/developers/docs)
- [Liner support](https://liner.com/support/form?source=developer)
- [Liner privacy policy](https://liner.com/privacy)
- [Liner API terms](https://liner.com/api-terms-of-service)

## License

Apache-2.0
