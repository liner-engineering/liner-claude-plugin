---
description: Set up or troubleshoot the Liner Claude plugin, LINER_API_KEY, and the liner MCP server connection.
---

# Liner Setup

Use this skill when the user wants to install, configure, verify, or troubleshoot the Liner Claude plugin.

Checklist:

1. Confirm the plugin is loaded as `liner`.
2. Confirm the user has a Liner API key from the Liner Developer Platform.
3. Confirm the plugin's sensitive `Liner API Key` setting is configured.
4. Ask the user to run `/reload-plugins` after plugin changes.
5. Ask the user to open `/mcp` and confirm the `liner` server is connected.
6. Confirm the server exposes `search_web`, `search_scholar`, `quick_answer`, `ai_search`, `ai_search_pro`, `deep_research`, and `deep_research_pro`.

Never ask the user to paste an API key into chat. If authentication fails, explain how to update the plugin's sensitive `Liner API Key` setting and reload or restart Claude Code.

Use this local development command when helpful:

```bash
claude --plugin-dir ./liner-claude-plugin
```

If tools do not appear, recommend running `/reload-plugins` or restarting Claude Code. Many MCP clients load MCP configuration and plugin settings at startup.
