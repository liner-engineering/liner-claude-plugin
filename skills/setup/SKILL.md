---
description: Set up or troubleshoot the Liner Claude plugin, OAuth login, and the liner MCP server connection.
---

# Liner Setup

Use this skill when the user wants to install, configure, verify, or troubleshoot the Liner Claude plugin.

Checklist:

1. Confirm the plugin is loaded as `liner`.
2. Confirm the user has a Liner account with access to Liner MCP.
3. Ask the user to open `/mcp`, select the `liner` server, and complete OAuth login in the browser.
4. Ask the user to run `/reload-plugins` after plugin changes.
5. Ask the user to open `/mcp` and confirm the `liner` server is connected.
6. Confirm the server exposes `search_web`, `search_scholar`, `quick_answer`, `ai_search`, `ai_search_pro`, `deep_research`, and `deep_research_pro`.

Never ask the user to paste an API key, access token, refresh token, or callback URL into chat unless Claude Code specifically asks them to paste the browser callback URL into its local prompt after a redirect failure. If authentication fails, explain how to use "Clear authentication" in `/mcp`, retry OAuth login, and reload or restart Claude Code.

Use this local development command when helpful:

```bash
claude --plugin-dir ./liner-claude-plugin
```

If tools do not appear, recommend running `/reload-plugins` or restarting Claude Code. Many MCP clients load MCP configuration and plugin settings at startup.
