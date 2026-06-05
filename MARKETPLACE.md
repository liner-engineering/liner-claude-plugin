# Claude Plugin Marketplace Copy

Use this copy when submitting the plugin to the Claude plugin directory / `claude-plugins-official` marketplace.

## Listing

| Field | Recommended value |
| --- | --- |
| Plugin name | Liner |
| Plugin ID | `liner` |
| Version | `0.1.0` |
| Category | Research, AI Tools, Developer Tools |
| Homepage | `https://liner.com/developers` |
| Documentation | `https://liner.com/developers/docs/mcp` |
| Repository | `https://github.com/liner/liner-claude-plugin` |
| License | Apache-2.0 |
| Logo | `assets/liner-logo-square-512.png` |

## Short Description

Source-backed web, scholar, AI answer, and deep research workflows powered by Liner MCP.

## Long Description

Liner connects Claude to source-backed research tools for fresh web context, academic retrieval, cited answers, and long-form research reports. The plugin bundles Liner's remote MCP server and workflow skills that help Claude choose the right Liner tool for the task, from quick factual answers to deeper multi-step research briefs.

## Use Cases

- Search the public web and return ranked results with source metadata.
- Search academic and scholarly sources.
- Generate short factual answers with citations.
- Generate richer AI Search answers for market, product, and technical questions.
- Run multi-step source-backed research briefs directly from Claude Code or Cowork.

## Setup Copy

Create a Liner API key from the Liner Developer Platform, install or load the plugin, and enter the key when Claude Code prompts for the plugin's sensitive `Liner API Key` setting. Open `/mcp` to confirm the `liner` server is connected and exposing tools.

## Review Notes

- The bundled MCP server is remote Streamable HTTP.
- The plugin reads credentials from Claude Code's sensitive plugin configuration and does not store or ship API keys in the repository.
- All current Liner MCP tools are read-only.
- The separate Claude Connectors Directory listing should be held until Liner supports OAuth-compatible connector authentication or receives Anthropic approval for a custom connection flow.
