# Liner Claude Plugin Test Plan

## Local Validation

Run from the workspace root:

```bash
claude plugin validate ./liner-claude-plugin --strict
```

Expected:

- Manifest validates.
- Skills are discovered from `skills/*/SKILL.md`.
- MCP config is accepted.
- No strict warnings from unexpected manifest fields.

## Local Plugin Load

Run:

```bash
claude --plugin-dir ./liner-claude-plugin
```

Inside Claude Code:

```text
/reload-plugins
/mcp
```

Expected:

- Plugin appears as `liner`.
- MCP server appears as `liner`.
- `/mcp` shows the `liner` server needs authentication on first use.
- The user can complete browser-based OAuth login.
- MCP server connects successfully after OAuth.
- The Liner server exposes these tools: `search_web`, `search_scholar`, `search_agent`, `quick_answer_agent`, `deep_research_agent`.

## OAuth Discovery Test

Run an unauthenticated request against the MCP endpoint:

```bash
curl -i https://platform.liner.com/api/v1/mcp
```

Expected:

- Response status is `401 Unauthorized`.
- Response includes `WWW-Authenticate: Bearer resource_metadata="https://platform.liner.com/.well-known/oauth-protected-resource"`.
- Protected-resource metadata has `resource: "https://platform.liner.com/api/v1/mcp"`.
- Authorization-server metadata advertises authorization, token, registration, and revocation endpoints.
- `scopes_supported` includes `mcp`.

## Tool Exercise Prompts

Use non-sensitive prompts:

| Tool | Prompt |
| --- | --- |
| `search_web` | `Use Liner search_web for recent AI search trends.` |
| `search_scholar` | `Use Liner search_scholar for retrieval augmented generation evaluation.` |
| `quick_answer_agent` | `Use Liner quick_answer_agent: What is retrieval augmented generation?` |
| `search_agent` | `Use Liner search_agent: Summarize current enterprise AI search trends.` |
| `deep_research_agent` | `Use Liner deep_research_agent: Create a concise brief on agentic search products.` |

Expected:

- Each tool returns a successful response with valid parameters.
- Search tools return source metadata.
- Answer and research tools return answer text with references or citations where available.
- Long-running research calls stay within the plugin timeout.
- Tool output is bounded enough for Claude Code to consume.

## Secret Safety Checks

Run before publishing:

```bash
rg -n "sk-[A-Za-z0-9_-]{20,}|liner_[A-Za-z0-9_-]{20,}" ./liner-claude-plugin
```

Expected:

- No real API keys.
- No plugin configuration asks users to enter API keys.

## Connector Directory Readiness Tests

- Add the server as a custom connector in Claude.ai.
- Complete OAuth login with a fresh Liner test account.
- Verify each tool has `title` and `readOnlyHint: true`.
- Exercise every tool from Claude.ai and Claude Code.
- Confirm reviewer credentials work from a fresh account.

## Direct MCP Inspector Smoke Test

Maintainers can still test the remote MCP endpoint outside Claude Code with a server-issued bearer credential, for example from `.env`. This validates the tool surface but does not replace browser OAuth testing for marketplace review:

```bash
set -a; . ./.env; set +a
npx -y @modelcontextprotocol/inspector --cli https://platform.liner.com/api/v1/mcp \
  --transport http \
  --header "Authorization: Bearer $LINER_API_KEY" \
  --method tools/list
```
