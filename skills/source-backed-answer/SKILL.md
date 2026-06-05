---
description: Use Liner MCP to answer factual, product, market, or technical questions with citations and source-backed context.
---

# Source-Backed Answers With Liner

Use this skill when the user asks for a factual answer, market summary, product comparison, technical explanation, or current-information question that benefits from citations.

Choose the narrowest Liner tool that fits:

| Need | Tool |
| --- | --- |
| Short factual lookup or fastest answer | `quick_answer` |
| Cited answer with normal depth | `ai_search` |
| Harder, nuanced, or higher-quality cited answer | `ai_search_pro` |
| Raw links/snippets without synthesis | `search_web` |

Default behavior:

- Prefer `quick_answer` for simple one-hop facts.
- Prefer `ai_search` for normal cited synthesis.
- Prefer `ai_search_pro` when the user asks for comparison, strategy, market context, or higher confidence.
- Use `search_web` when the user specifically wants source lists, URLs, snippets, or retrieval output for their own workflow.

After using Liner, summarize the answer and include the most useful source context surfaced by the tool. Keep the response proportional to the user's request.
