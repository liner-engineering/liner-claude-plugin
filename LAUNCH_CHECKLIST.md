# Official Launch Checklist

Use this checklist to move the Liner Claude plugin from local package to the official Claude plugin directory / `claude-plugins-official` marketplace.

## 1. Finalize Ownership

- Confirm the public GitHub destination, for example `https://github.com/liner/liner-claude-plugin`.
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

Expected: all seven Liner MCP tools are listed.

## 4. Test Install UX

- Install or load the plugin in Claude Code.
- Confirm Claude Code prompts for the sensitive `Liner API Key` plugin setting.
- Open `/mcp` and confirm the `liner` MCP server connects.
- Exercise the setup skill and the source-backed answer, scholar search, and research brief workflows.
- Confirm users are never asked to paste API keys into chat.

## 5. Submit To Claude

Submit through one of the official forms:

- Claude.ai: `https://claude.ai/settings/plugins/submit`
- Console: `https://platform.claude.com/plugins/submit`

Submission inputs:

- Use the public GitHub repo link unless Anthropic specifically asks for a zip.
- Use copy from `MARKETPLACE.md`.
- Attach or reference `assets/liner-logo-square-512.png`.
- Mention the plugin bundles a remote Streamable HTTP MCP server and stores the Liner API key through Claude Code sensitive plugin configuration.
- Include `VALIDATION_REPORT.md` as the testing summary.

## 6. After Approval

- Confirm the plugin appears in the Claude Code official marketplace / plugin directory.
- Install from the public listing on a fresh machine or account.
- Run `/mcp` and all seven smoke prompts from `TEST_PLAN.md`.
- Monitor support requests for auth setup, MCP connection failures, and Deep Research runtime issues.
- Push updates to the same GitHub repo; Claude docs say published plugin updates are picked up automatically after repo changes and automated screening.

## Connector Directory Follow-Up

Do not submit the reviewed Claude Connectors Directory entry yet.

Current blockers:

- Liner MCP uses Bearer API-key auth; Claude reviewed authenticated connectors require an OAuth-compatible flow or Anthropic-approved custom support.
- MCP Inspector `tools/list` did not show `title` or `readOnlyHint` annotations for the current tool schemas.

Next connector work:

- Add MCP tool annotations server-side: `title` and `readOnlyHint: true`.
- Implement OAuth with CIMD/DCR, or get Anthropic approval for custom connector authentication.
- Re-run the Connector Directory readiness tests in `CONNECTOR_DIRECTORY_DRAFT.md`.
