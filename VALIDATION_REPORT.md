# Validation Report

Validation date: 2026-06-05

## Summary

The Claude plugin package validates successfully, and the remote Liner MCP server was exercised with a real maintainer API key loaded from `.env`. All seven current MCP tools returned successful non-error responses through MCP Inspector.

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

## Remote MCP Tool Listing

Command shape:

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

Connector Directory note: Inspector output did not show `title` or `readOnlyHint` tool annotations. Add those server-side before submitting a reviewed Claude Connectors Directory listing.

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
- Claude Code end-to-end UX should be tested after logging into Claude, especially the sensitive `Liner API Key` plugin configuration prompt.
- Deep Research responses can be large and long-running, so reviewer prompts should be concise.
