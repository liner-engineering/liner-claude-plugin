---
description: Use Liner MCP to answer factual, product, market, or technical questions with citations and source-backed context. Use when the user needs a current-information answer backed by web sources.
argument-hint: <question>
---

# Source-Backed Answers With Liner

Use this skill when the user asks for a factual answer, market summary, product comparison, technical explanation, or current-information question that benefits from citations.

Choose the narrowest Liner tool that fits:

| Need | Tool |
| --- | --- |
| Short factual lookup or fastest answer | `quick_answer_agent` |
| Cited answer synthesized via iterative search | `search_agent` |
| Raw links/snippets without synthesis | `search_web` |

Calling conventions:

- `search_web` takes `query` (string, required) and optional `limit` (1-50, default 10). It returns ranked results with title, URL, and snippet.
- `quick_answer_agent` and `search_agent` take a `messages` array of `{role, content}` objects with roles `user` or `assistant`. For a fresh question, send a single user message: `{"messages": [{"role": "user", "content": "<question>"}]}`. For follow-ups, include prior turns so the agent has conversational context.
- Agent tools return a stream of events; extract the `text-delta` content for the answer and `data-search-references` for citation sources.

Default behavior:

- Prefer `quick_answer_agent` for simple one-hop facts.
- Prefer `search_agent` for cited synthesis: comparisons, market context, technical explanations, or anything needing multiple sources.
- Use `search_web` when the user specifically wants source lists, URLs, snippets, or retrieval output for their own workflow.
- For deeper multi-step investigations, use `deep_research_agent` instead (see the `liner:research-brief` skill).

After using Liner, summarize the answer and include the most useful source URLs surfaced by the tool. Keep the response proportional to the user's request.
