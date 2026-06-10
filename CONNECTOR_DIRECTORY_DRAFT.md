# Claude Connectors Directory Draft

Use this draft for a Claude Connectors Directory submission after final OAuth login and tool annotation checks pass.

## Submission Status

| Area | Status |
| --- | --- |
| MCP server URL | Ready: `https://platform.liner.com/api/v1/mcp` |
| Transport | Ready: Streamable HTTP |
| OAuth discovery | Ready: MCP returns `401` with `WWW-Authenticate` protected-resource metadata. |
| Authorization server | Ready: `https://platform.liner.com/.well-known/oauth-authorization-server` advertises authorization, token, registration, revocation, PKCE S256, and `mcp` scope. |
| Tool surface | Ready after final `title` and `readOnlyHint: true` schema audit. |
| Current auth | OAuth 2.0 authorization code with PKCE and dynamic client registration. |
| Submission recommendation | Submit after a fresh Claude.ai OAuth login test and tool annotation audit. |

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
| Auth type | OAuth 2.0 |
| OAuth issuer | `https://platform.liner.com` |
| Protected-resource metadata | `https://platform.liner.com/.well-known/oauth-protected-resource` |
| Authorization-server metadata | `https://platform.liner.com/.well-known/oauth-authorization-server` |
| Scope | `mcp` |
| Read/write capabilities | Read-only |
| Allowed link URIs | Leave blank unless future MCP App UI or `ui/open-link` support is added. |
| MCP App UI | No for v1; carousel screenshots not required. |

## Tool Inventory

Confirm these tool annotations before submission:

| Tool name | Human title | Expected annotation | Description guardrail |
| --- | --- | --- | --- |
| `search_web` | Search Web | `readOnlyHint: true` | Searches the public web and returns ranked source metadata. |
| `search_scholar` | Search Scholar | `readOnlyHint: true` | Searches academic and scholarly sources. |
| `search_agent` | Search Agent | `readOnlyHint: true` | Synthesizes a cited answer via iterative AI-augmented search. |
| `quick_answer_agent` | Quick Answer | `readOnlyHint: true` | Returns a short factual answer with supporting references. |
| `deep_research_agent` | Deep Research | `readOnlyHint: true` | Runs the highest-effort multi-step source-backed research workflow. |

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
| Features enabled | Web Search, Scholar Search, Search Agent, Quick Answer, Deep Research |
| Expiration | Non-expiring |
| Setup notes | Reviewer should connect the Liner connector and complete OAuth login in Claude. |

## Launch Readiness

Test before submission:

- Add as a custom connector in Claude.ai.
- Complete OAuth login with a fresh reviewer account.
- Test in Claude.ai, Claude Desktop, Claude Code, and Cowork where available.
- Run MCP Inspector against every tool.
- Preserve request IDs or trace IDs from each successful tool call for review debugging.
- Confirm Anthropic egress traffic is not blocked by CDN, WAF, or origin rules.
