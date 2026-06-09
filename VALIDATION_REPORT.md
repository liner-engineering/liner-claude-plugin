# Validation Report

Validation date: 2026-06-08

## Summary

The Claude plugin package validates successfully after switching from plugin-provided API-key configuration to OAuth-discovered Liner MCP authentication. The live MCP endpoint now returns OAuth protected-resource metadata, and the authorization server advertises dynamic client registration, PKCE, token refresh, revocation, and `mcp` scope.

The remote Liner MCP server was also exercised with a real maintainer bearer credential loaded from `.env` to verify the current seven-tool surface. That smoke test validates tool behavior, but marketplace OAuth UX still needs one interactive Claude Code or Claude.ai login test.

Claude Code live end-to-end testing was not completed in this environment because the local Claude CLI is not logged in and returned `Not logged in · Please run /login`.

## Plugin Validation

Command:

```bash
npx -y @anthropic-ai/claude-code plugin validate ./liner-claude-plugin --strict
```

Result:

```text
✔ Validation passed
```

Also checked:

- `.claude-plugin/plugin.json` parses as valid JSON.
- `.mcp.json` parses as valid JSON.
- Secret scan found no plausible real API keys in `liner-claude-plugin`.

## OAuth Discovery

Unauthenticated MCP endpoint check:

```bash
curl -i https://platform.liner.com/api/v1/mcp
```

Result:

- Status: `401 Unauthorized`
- Header: `WWW-Authenticate: Bearer resource_metadata="https://platform.liner.com/.well-known/oauth-protected-resource"`

Protected-resource metadata:

```json
{
  "resource": "https://platform.liner.com/api/v1/mcp",
  "authorization_servers": ["https://platform.liner.com"]
}
```

Authorization-server metadata:

```json
{
  "issuer": "https://platform.liner.com",
  "authorization_endpoint": "https://platform.liner.com/oauth/authorize",
  "token_endpoint": "https://platform.liner.com/oauth/token",
  "registration_endpoint": "https://platform.liner.com/oauth/register",
  "revocation_endpoint": "https://platform.liner.com/oauth/revoke",
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "token_endpoint_auth_methods_supported": ["none"],
  "scopes_supported": ["mcp"]
}
```

## Remote MCP Tool Listing

Maintainer smoke-test command shape:

```bash
npx -y @modelcontextprotocol/inspector --cli https://platform.liner.com/api/v1/mcp \
  --transport http \
  --header "Authorization: Bearer $LINER_API_KEY" \
  --method tools/list
```

Result: success.

Tools listed:

- `search_web`
- `search_scholar`
- `ai_search`
- `ai_search_pro`
- `quick_answer`
- `deep_research`
- `deep_research_pro`

## Tool Schema Annotation Audit

MCP Inspector currently lists all seven tools, but none of them expose top-level `title` or `annotations.readOnlyHint` fields.

Current audit result:

| Tool | `title` visible | `annotations.readOnlyHint` visible |
| --- | --- | --- |
| `search_web` | No | No |
| `search_scholar` | No | No |
| `quick_answer` | No | No |
| `ai_search` | No | No |
| `ai_search_pro` | No | No |
| `deep_research` | No | No |
| `deep_research_pro` | No | No |

This does not block Claude Code plugin marketplace validation, but it should be fixed server-side before a reviewed Claude Connectors Directory submission.

## Tool Smoke Tests

| Tool | Prompt / query | Result | Notes |
| --- | --- | --- | --- |
| `search_web` | `recent AI search trends` | Passed | Returned source result JSON; summarized payload was 3,607 chars. |
| `search_scholar` | `retrieval augmented generation evaluation` | Passed | Returned scholarly result JSON; summarized payload was 17,530 chars. |
| `quick_answer` | `What is retrieval augmented generation?` | Passed | Returned streamed answer events with references. |
| `ai_search` | `Summarize current enterprise AI search trends in one paragraph.` | Passed | Returned streamed answer events; summarized payload was 4,039 chars. |
| `ai_search_pro` | `Compare AI search APIs for source-backed answers in two concise bullets.` | Passed | Returned streamed answer events; summarized payload was 8,657 chars. |
| `deep_research` | `Create a concise brief on agentic search products. Keep it short.` | Passed | Completed in about 54 seconds; summarized payload was 28,888 chars. |
| `deep_research_pro` | `Create a concise brief on agentic search products. Keep it short.` | Passed | Completed in about 20 seconds; summarized payload was 10,331 chars. |

## Remaining Launch Risks

- The public GitHub repo has not been created or pushed yet.
- The repository URL in `plugin.json` is currently `https://github.com/liner/liner-claude-plugin`; update it if the official repo will use a different URL.
- Claude Code and Claude.ai end-to-end OAuth UX should be tested with a fresh Liner reviewer account.
- Tool schemas should be audited for visible `title` and `readOnlyHint: true` annotations before reviewed Connectors Directory submission.
- Deep Research responses can be large and long-running, so reviewer prompts should be concise.
