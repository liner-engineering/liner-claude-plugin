const vscode = require('vscode');

const SERVER_URL = 'https://platform.liner.com/api/v1/mcp';
const SERVER_VERSION = '1.0.0';

function activate(context) {
  // MCP server registration requires VS Code 1.101 or later.
  if (!vscode.lm || typeof vscode.lm.registerMcpServerDefinitionProvider !== 'function') {
    return;
  }

  const didChange = new vscode.EventEmitter();
  context.subscriptions.push(didChange);

  context.subscriptions.push(
    vscode.lm.registerMcpServerDefinitionProvider('liner', {
      onDidChangeMcpServerDefinitions: didChange.event,
      provideMcpServerDefinitions: async () => [
        // No headers: VS Code runs the OAuth flow (dynamic client registration + PKCE) on first use.
        new vscode.McpHttpServerDefinition('Liner', vscode.Uri.parse(SERVER_URL), {}, SERVER_VERSION)
      ],
      resolveMcpServerDefinition: async (server) => server
    })
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
