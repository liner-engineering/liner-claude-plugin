# Validation Report

Validation date: 2026-06-10

## Summary

The Claude plugin package was revalidated against the current live Liner MCP server. The server now exposes a five-tool surface (`search_web`, `search_scholar`, `search_agent`, `quick_answer_agent`, `deep_research_agent`), replacing the previous seven-tool surface (`quick_answer`, `ai_search`, `ai_search_pro`, `deep_research`, `deep_research_pro`). All skills, the README, marketplace copy, test plan, and Connector Directory draft were updated to match, and the live tools were exercised directly against `https://platform.liner.com/api/v1/mcp` with a maintainer bearer credential.

The live MCP endpoint returns OAuth protected-resource metadata for unauthenticated requests, and the authorization server advertises dynamic client registration, PKCE, token refresh, revocation, and `mcp` scope.

## OAuth Discovery

Unauthenticated MCP endpoint check:

```bash
curl -i https://platform.liner.com/api/v1/mcp
```

Result:

- Status: `401 Unauthorized`
- Header: `WWW-Authenticate: Bearer resource_metadata="https://platform.liner.com/.well-known/oauth-protected-resource"`

## Remote MCP Tool Listing

A raw Streamable HTTP session was opened with `initialize` (server reports `liner-mcp` v1.0.0, protocol `2025-06-18`) followed by `tools/list`. Tools listed:

- `search_web` — input: `query` (string, 1-1000 chars, required), `limit` (integer, 1-50, default 10)
- `search_scholar` — input: `query` (string, 1-1000 chars, required), `limit` (integer, 1-50, default 10)
- `search_agent` — input: `messages` (array of `{role: user|assistant, content: string}`, min 1, required)
- `quick_answer_agent` — input: `messages` (same shape as above)
- `deep_research_agent` — input: `messages` (same shape as above)

## Tool Schema Annotation Audit

None of the five tools expose top-level `title` or `annotations.readOnlyHint` fields in the live schema.

| Tool | `title` visible | `annotations.readOnlyHint` visible |
| --- | --- | --- |
| `search_web` | No | No |
| `search_scholar` | No | No |
| `search_agent` | No | No |
| `quick_answer_agent` | No | No |
| `deep_research_agent` | No | No |

This does not block Claude Code plugin marketplace validation, but it should be fixed server-side before a reviewed Claude Connectors Directory submission.

## Tool Smoke Tests

| Tool | Prompt / query | Result | Notes |
| --- | --- | --- | --- |
| `search_web` | `Claude Code plugin marketplace` (limit 2) | Passed | Returned ranked result JSON with `requestId`, titles, URLs, descriptions. |
| `search_scholar` | `large language model citations` (limit 1) | Passed | Returned scholarly result JSON with title, URL, hostname, abstract. |
| `quick_answer_agent` | `What year was Anthropic founded?` | Passed | Returned streamed event JSON: `start`, `text-delta` answer, `data-search-references` with 3 sources, `finish`. |

Agent tools (`search_agent`, `quick_answer_agent`, `deep_research_agent`) return a serialized stream of events; clients should read `text-delta` events for answer text and `data-search-references` for citation sources. Deep Research responses can be large and long-running, so reviewer prompts should be concise.

## Remaining Launch Risks

- `claude plugin validate` should be re-run locally before submission (the review pipeline runs the same check).
- Claude Code and Claude.ai end-to-end OAuth UX should be tested with a fresh Liner reviewer account.
- Tool schemas should be audited server-side for visible `title` and `readOnlyHint: true` annotations before reviewed Connectors Directory submission.
