# Installing the Liner MCP server

Liner is a remote MCP server. There is nothing to clone, build, or run locally.

- Server URL: `https://platform.liner.com/api/v1/mcp`
- Transport: Streamable HTTP
- Authentication: OAuth 2.1 (dynamic client registration, PKCE). A Liner API key also works as a bearer token.

## Option A: OAuth (recommended)

Add the server with only its URL. On first use, the client opens a browser window where the user signs in to Liner and approves access. No key needs to be copied.

```json
{
  "mcpServers": {
    "liner": {
      "url": "https://platform.liner.com/api/v1/mcp"
    }
  }
}
```

## Option B: API key

If the client cannot complete an OAuth flow, create an API key at https://platform.liner.com and send it as a bearer token.

```json
{
  "mcpServers": {
    "liner": {
      "url": "https://platform.liner.com/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_LINER_API_KEY"
      }
    }
  }
}
```

Ask the user for their key. Never invent one or commit it to a repository.

## Verify

After connecting, the server should list five read-only tools: `search_web`, `search_scholar`, `search_agent`, `quick_answer_agent`, and `deep_research_agent`. Try: "Use Liner to find recent peer-reviewed papers on retrieval-augmented generation evaluation."

Docs: https://liner.com/developers/docs/mcp
