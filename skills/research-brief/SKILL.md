---
description: Use Liner Deep Research tools for multi-step source-backed research briefs and complex investigations.
---

# Research Briefs With Liner

Use this skill when the user asks for a research brief, multi-step investigation, landscape scan, due diligence memo, or a question that cannot be answered well with a single quick search.

Choose the tool:

| Need | Tool |
| --- | --- |
| Multi-step brief with source-backed synthesis | `deep_research` |
| Highest-effort investigation for difficult or ambiguous topics | `deep_research_pro` |

Default behavior:

- Use `deep_research` for normal research briefs.
- Use `deep_research_pro` when the user asks for deeper coverage, more confidence, harder synthesis, or high-stakes business research.
- Narrow the research question before calling the tool if the user's request is broad.
- Preserve the user's requested format, such as bullets, memo, table, or executive summary.

After the tool returns, produce a concise brief with key findings, source-backed support, and any notable uncertainty shown by the retrieved evidence.
