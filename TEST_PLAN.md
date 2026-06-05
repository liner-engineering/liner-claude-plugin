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

When prompted, enter a Liner API key in the sensitive plugin configuration field.

Inside Claude Code:

```text
/reload-plugins
/mcp
```

Expected:

- Plugin appears as `liner`.
- MCP server appears as `liner`.
- MCP server connects successfully.
- The Liner server exposes these tools: `search_web`, `search_scholar`, `quick_answer`, `ai_search`, `ai_search_pro`, `deep_research`, `deep_research_pro`.

## Missing-Key Test

Run Claude Code without `LINER_API_KEY`.

Expected:

- No API key is printed or requested in chat.
- Claude Code prompts for the sensitive `Liner API Key` plugin setting, or the server fails authentication clearly if no key is configured.
- The setup skill directs the user to configure the plugin key and reload the plugin.

## Tool Exercise Prompts

Use non-sensitive prompts:

| Tool | Prompt |
| --- | --- |
| `search_web` | `Use Liner search_web for recent AI search trends.` |
| `search_scholar` | `Use Liner search_scholar for retrieval augmented generation evaluation.` |
| `quick_answer` | `Use Liner quick_answer: What is retrieval augmented generation?` |
| `ai_search` | `Use Liner ai_search: Summarize current enterprise AI search trends.` |
| `ai_search_pro` | `Use Liner ai_search_pro: Compare AI search APIs for source-backed answers.` |
| `deep_research` | `Use Liner deep_research: Create a concise brief on agentic search products.` |
| `deep_research_pro` | `Use Liner deep_research_pro: Create a deeper brief on agentic search products.` |

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
- Only placeholder references to `LINER_API_KEY`.

## Connector Directory Readiness Tests

Run only after the OAuth-compatible auth path exists:

- Use MCP Inspector against `https://platform.liner.com/api/v1/mcp`.
- Verify each tool has `title` and `readOnlyHint: true`.
- Add the server as a custom connector in Claude.ai.
- Exercise every tool from Claude.ai and Claude Code.
- Confirm reviewer credentials work from a fresh account.

## Direct MCP Inspector Smoke Test

Maintainers can test the remote MCP endpoint outside Claude Code by setting `LINER_API_KEY` locally:

```bash
set -a; . ./.env; set +a
npx -y @modelcontextprotocol/inspector --cli https://platform.liner.com/api/v1/mcp \
  --transport http \
  --header "Authorization: Bearer $LINER_API_KEY" \
  --method tools/list
```
