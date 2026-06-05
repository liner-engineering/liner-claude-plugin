# Claude Connectors Directory Draft

This is a held draft for a future Claude Connectors Directory submission. Do not submit until the authentication blocker is resolved.

## Submission Status

| Area | Status |
| --- | --- |
| MCP server URL | Ready: `https://platform.liner.com/api/v1/mcp` |
| Transport | Ready: Streamable HTTP |
| Tool surface | Ready for review after schema audit |
| Current auth | API-key Bearer token via `LINER_API_KEY` |
| Directory auth blocker | Static user-pasted bearer tokens are not supported for reviewed authenticated connectors. |
| Required next auth step | Implement OAuth with CIMD/DCR, request Anthropic-held credentials, or request custom connection support from Anthropic. |
| Submission recommendation | Hold until auth is compatible. |

## Server Basics

| Field | Recommended answer |
| --- | --- |
| Connector name | Liner |
| Tagline | Source-backed web, scholar, AI answer, and deep research tools for Claude. |
| Description | Liner connects Claude to fresh web search, scholarly search, cited answers, quick factual answers, and multi-step deep research workflows. Use it when an assistant needs source-backed retrieval or cited synthesis directly from the conversation. |
| Category | AI Tools / Research / Developer Tools |
| Server URL | `https://platform.liner.com/api/v1/mcp` |
| Homepage | `https://liner.com/developers` |
| Documentation | `https://liner.com/developers/docs/mcp` |
| Support | `https://liner.com/support/form?source=developer` |
| Privacy policy | `https://liner.com/privacy` |
| Terms | `https://liner.com/api-terms-of-service` |

## Connection Details

| Field | Recommended answer |
| --- | --- |
| Connector type | Remote MCP server |
| Protocol | MCP over Streamable HTTP |
| Auth type for final submission | OAuth 2.0, pending implementation or Anthropic-approved alternative |
| Current auth type | Bearer token from Liner API key |
| Read/write capabilities | Read-only |
| Allowed link URIs | Leave blank unless future MCP App UI or `ui/open-link` support is added. |
| MCP App UI | No for v1; carousel screenshots not required. |

## Tool Inventory

Confirm these tool annotations before submission:

| Tool name | Human title | Expected annotation | Description guardrail |
| --- | --- | --- | --- |
| `search_web` | Search Web | `readOnlyHint: true` | Searches the public web and returns ranked source metadata. |
| `search_scholar` | Search Scholar | `readOnlyHint: true` | Searches academic and scholarly sources. |
| `quick_answer` | Quick Answer | `readOnlyHint: true` | Returns a short factual answer with supporting references. |
| `ai_search` | AI Search | `readOnlyHint: true` | Generates a cited answer with web or scholarly source grounding. |
| `ai_search_pro` | AI Search Pro | `readOnlyHint: true` | Generates a higher-effort cited answer for harder questions. |
| `deep_research` | Deep Research | `readOnlyHint: true` | Runs a multi-step source-backed research workflow. |
| `deep_research_pro` | Deep Research Pro | `readOnlyHint: true` | Runs the highest-effort source-backed research workflow. |

Schema audit checklist:

- Each tool name is under 64 characters.
- Each tool has a `title`.
- Each tool has `readOnlyHint: true`.
- No tool description includes hidden instructions, product-promotion instructions, or instructions that interfere with other tools.
- Error responses are actionable and do not collapse into generic internal errors.
- Outputs are bounded for the task, especially Deep Research responses.

## Data And Compliance Notes

- Liner MCP calls Liner first-party APIs.
- User prompts, queries, and request parameters are sent to Liner for retrieval and answer generation.
- Results may include public web sources, scholarly metadata, citations, generated answer text, and research reports.
- The connector should not request Claude memory, chat history, local files, or private user data.
- A fully populated reviewer test account with API credits is required before submission.

## Reviewer Test Account

Fill before submission:

| Requirement | Value |
| --- | --- |
| Reviewer email | `[fill]` |
| Login method | `[fill]` |
| OAuth app/client configured | `[pending]` |
| Test account has API credits | `[fill]` |
| Features enabled | Web Search, Scholar Search, Quick Answer, AI Search, AI Search Pro, Deep Research, Deep Research Pro |
| Expiration | Non-expiring |
| Setup notes | `[fill after OAuth path is complete]` |

## Launch Readiness

Test before submission:

- Add as a custom connector in Claude.ai after OAuth-compatible auth is available.
- Test in Claude.ai, Claude Desktop, Claude Code, and Cowork where available.
- Run MCP Inspector against every tool.
- Preserve request IDs or trace IDs from each successful tool call for review debugging.
- Confirm Anthropic egress traffic is not blocked by CDN, WAF, or origin rules.
