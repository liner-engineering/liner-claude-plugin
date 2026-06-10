---
description: Use Liner search_scholar for academic retrieval, literature scans, and scholarly source discovery. Use when the user asks for papers, journals, preprints, or peer-reviewed evidence.
argument-hint: <topic>
---

# Scholar Search With Liner

Use this skill when the user asks for papers, academic sources, literature review support, scholarly evidence, citation metadata, or research from journals and preprints.

Use `search_scholar` when the user needs:

- Scholarly search results from peer-reviewed and academic sources.
- Academic metadata such as titles, URLs, hostnames, and abstracts.
- Candidate papers for later synthesis.
- Literature scan inputs for RAG, review, or bibliography workflows.

Calling convention:

- `search_scholar` takes `query` (string, required) and optional `limit` (1-50, default 10). Phrase the query in academic terms (methods, fields, keywords) rather than conversational language.

If the user wants a synthesized answer from scholarly sources rather than raw academic results, use `search_agent` with scholar-oriented wording (a `messages` array with a single user message), either after retrieving raw results or instead of them, depending on the request.

Return the most relevant papers or scholarly results with titles, URLs, and metadata available from Liner.
