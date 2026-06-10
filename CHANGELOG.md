# Changelog

## 0.3.0

- Updated all skills and docs to the current live Liner MCP tool surface: `search_web`, `search_scholar`, `search_agent`, `quick_answer_agent`, `deep_research_agent` (replacing `quick_answer`, `ai_search`, `ai_search_pro`, `deep_research`, `deep_research_pro`).
- Documented the `messages`-array calling convention for the agent tools and the streamed event output format.
- Added `.claude-plugin/marketplace.json` so the repository can be added directly as a plugin marketplace.
- Set the repository URL to `https://github.com/mjkang-estrella/liner-claude-plugin` and declared an explicit `skills` path in `plugin.json`.

## 0.2.0

- Switched marketplace authentication from plugin-provided API-key configuration to Liner MCP OAuth discovery.
- Removed the plugin `userConfig.api_key` field and static Authorization header.
- Updated setup, marketplace, launch, and Connector Directory materials for OAuth-ready submission.

## 0.1.0

- Initial Claude Code/Cowork plugin package for Liner MCP.
- Added remote Streamable HTTP MCP configuration for `https://platform.liner.com/api/v1/mcp`.
- Added setup, source-backed answer, research brief, and scholar search skills.
- Added marketplace copy, test plan, and held Connector Directory submission draft.
