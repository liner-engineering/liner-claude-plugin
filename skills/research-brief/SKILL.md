---
description: Use Liner deep_research_agent for multi-step source-backed research briefs and complex investigations. Use when the user asks for deep, exhaustive, or multi-source research.
argument-hint: <research question>
---

# Research Briefs With Liner

Use this skill when the user asks for a research brief, multi-step investigation, landscape scan, due diligence memo, or a question that cannot be answered well with a single quick search.

Use `deep_research_agent`. It is Liner's highest-effort research tool: it runs multi-step iterative source gathering and synthesis. It is slower and more expensive than `search_agent`, so reserve it for genuinely deep requests.

Calling convention:

- `deep_research_agent` takes a `messages` array of `{role, content}` objects with roles `user` or `assistant`. For a fresh investigation, send a single user message containing the full research question: `{"messages": [{"role": "user", "content": "<research question>"}]}`.
- The tool returns a stream of events; extract `text-delta` content for the report body and `data-search-references` for citation sources.

Default behavior:

- Narrow the research question before calling the tool if the user's request is broad. State scope, timeframe, and desired output format in the message.
- For a normal cited answer that does not need multi-step investigation, use `search_agent` instead (see the `liner:source-backed-answer` skill).
- Preserve the user's requested format, such as bullets, memo, table, or executive summary.

After the tool returns, produce a concise brief with key findings, source-backed support, and any notable uncertainty shown by the retrieved evidence.
