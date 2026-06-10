# Claude Plugin Marketplace Copy

Use this copy when submitting the plugin to Claude's reviewed plugin marketplace. Anthropic's public docs describe third-party submissions as reviewed for the community marketplace; `claude-plugins-official` is curated separately at Anthropic's discretion.

## Listing

| Field | Recommended value |
| --- | --- |
| Plugin name | Liner |
| Plugin ID | `liner` |
| Version | `0.3.0` |
| Category | Research, AI Tools, Developer Tools |
| Homepage | `https://liner.com/developers` |
| Documentation | `https://liner.com/developers/docs/mcp` |
| Repository | `https://github.com/mjkang-estrella/liner-claude-plugin` |
| License | Apache-2.0 |
| Logo | `assets/liner-logo-square-512.png` |

## Short Description

OAuth-secured source-backed web, scholar, AI answer, and deep research workflows powered by Liner MCP.

## Long Description

Liner connects Claude to OAuth-secured source-backed research tools for fresh web context, academic retrieval, cited answers, and long-form research reports. The plugin bundles Liner's remote MCP server and workflow skills that help Claude choose the right Liner tool for the task, from quick factual answers to deeper multi-step research briefs.

## Use Cases

- Search the public web and return ranked results with source metadata.
- Search academic and scholarly sources.
- Generate short factual answers with citations via `quick_answer_agent`.
- Generate richer cited answers for market, product, and technical questions via `search_agent`.
- Run multi-step source-backed research briefs directly from Claude Code or Cowork.

## Setup Copy

Install or load the plugin, open `/mcp`, select the `liner` MCP server, and complete the OAuth login flow in your browser. After authentication, confirm the `liner` server is connected and exposing tools.

## Review Notes

- The bundled MCP server is remote Streamable HTTP.
- Authentication uses Liner MCP OAuth discovery and Claude Code's secure token storage.
- The repository does not store, ship, or prompt for API keys.
- All current Liner MCP tools are read-only.
- Liner MCP now advertises OAuth protected-resource and authorization-server metadata. Verify a fresh OAuth login before submitting a reviewed Connectors Directory listing.

## Official Marketplace Positioning

There is no separate public application process for `claude-plugins-official`. Submit through Claude's plugin submission form first, make the repository public and reviewer-ready, then use Liner's Anthropic partner or marketplace contact to request official curation if needed.
