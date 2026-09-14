# Official Launch Checklist

Use this checklist to move the Liner Claude plugin from local package to Claude's reviewed plugin marketplace submission. Anthropic's public docs describe third-party submissions as reviewed for the community marketplace; `claude-plugins-official` is curated separately at Anthropic's discretion.

## 1. Finalize Ownership

- Confirm the public GitHub destination: `https://github.com/liner-engineering/liner-claude-plugin`.
- If the repository URL changes, update `.claude-plugin/plugin.json`, `README.md`, and `MARKETPLACE.md`.
- Confirm Liner owns or has permission to use the Liner name, logo, docs links, and API.
- Confirm the submitter has an authorized Liner company-domain account for Claude.ai or Console submission.

## 2. Publish The Public Repository

- Commit the plugin contents from this directory.
- Push to the official public GitHub repo.
- Confirm the repository is public. Closed-source plugins are not accepted for the Claude plugin directory.
- Confirm the repo root contains:
  - `.claude-plugin/plugin.json`
  - `.mcp.json`
  - `skills/*/SKILL.md`
  - `README.md`
  - `LICENSE`
  - `MARKETPLACE.md`
  - `TEST_PLAN.md`
  - `VALIDATION_REPORT.md`

## 3. Run Pre-Submission Validation

```bash
npx -y @anthropic-ai/claude-code plugin validate ./liner-claude-plugin --strict
```

Expected: validation passes with no warnings.

Run a direct MCP smoke test with a maintainer key:

```bash
set -a; . ./.env; set +a
npx -y @modelcontextprotocol/inspector --cli https://platform.liner.com/api/v1/mcp \
  --transport http \
  --header "Authorization: Bearer $LINER_API_KEY" \
  --method tools/list
```

Expected: all five Liner MCP tools are listed (`search_web`, `search_scholar`, `search_agent`, `quick_answer_agent`, `deep_research_agent`).

Run OAuth discovery checks:

```bash
curl -i https://platform.liner.com/api/v1/mcp
curl -sS https://platform.liner.com/.well-known/oauth-protected-resource | jq .
curl -sS https://platform.liner.com/.well-known/oauth-authorization-server | jq .
```

Expected:

- MCP endpoint returns `401` with a `WWW-Authenticate` protected-resource metadata pointer.
- Protected-resource metadata `resource` exactly matches `https://platform.liner.com/api/v1/mcp`.
- Authorization-server metadata includes `authorization_endpoint`, `token_endpoint`, `registration_endpoint`, PKCE `S256`, public-client token auth, and `mcp` scope.

## 4. Test Install UX

- Install or load the plugin in Claude Code.
- Open `/mcp`, select the `liner` server, and complete OAuth login in the browser.
- Confirm the `liner` MCP server connects after OAuth.
- Exercise the setup skill and the source-backed answer, scholar search, and research brief workflows.
- Confirm users are never asked to paste API keys or OAuth tokens into chat.

## 5. Submit To Claude

Submit through one of the official forms:

- Claude.ai (requires a Team or Enterprise organization with directory management access): `https://claude.ai/admin-settings/directory/submissions/plugins/new`
- Console (for individual authors): `https://platform.claude.com/plugins/submit`

Approved plugins land in the community marketplace (`anthropics/claude-plugins-community`), pinned to a commit SHA; CI bumps the pin as you push new commits. Check the public catalog at `https://github.com/anthropics/claude-plugins-community/blob/main/.claude-plugin/marketplace.json` to confirm the listing.

Submission inputs:

- Use the public GitHub repo link unless Anthropic specifically asks for a zip.
- Use copy from `MARKETPLACE.md`.
- Attach or reference `assets/liner-logo-square-512.png`.
- Mention the plugin bundles a remote Streamable HTTP MCP server and uses Liner MCP OAuth discovery.
- Include `VALIDATION_REPORT.md` as the testing summary.
- If the business goal is `claude-plugins-official`, submit through the normal form first, then use Liner's Anthropic partner or marketplace contact to request official curation.

## 6. After Approval

- Confirm the plugin appears in the reviewed Claude Code marketplace / plugin directory.
- Install from the public listing on a fresh machine or account.
- Run `/mcp` and all five smoke prompts from `TEST_PLAN.md`.
- Monitor support requests for auth setup, MCP connection failures, and Deep Research runtime issues.
- Push updates to the same GitHub repo; Claude docs say published plugin updates are picked up automatically after repo changes and automated screening.

## Connector Directory Follow-Up

The auth blocker is resolved for a reviewed Claude Connectors Directory submission because Liner MCP now advertises OAuth discovery metadata.

Remaining connector work:

- Confirm OAuth login works from Claude.ai with a fresh reviewer account.
- Confirm MCP tool annotations are visible server-side: `title` and `readOnlyHint: true`.
- Re-run the Connector Directory readiness tests in `CONNECTOR_DIRECTORY_DRAFT.md`.
