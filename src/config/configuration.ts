import * as vscode from "vscode";
import QuickProjectsVariables from "./variables";

export const CONFIG_OPTIONS = {
  projectsPath: "ProjectsFolderPath",
  sameWindow: "OpenSameWindow",
};

export default class QuickProjectsConfiguration {
  projectsPath: string | undefined;
  sameWindow: boolean = true;
  config: vscode.WorkspaceConfiguration;

  constructor() {
    this.config = vscode.workspace.getConfiguration(
      QuickProjectsVariables.identifier
    );
    this.loadConfiguration();
  }

  loadConfiguration() {
    this.projectsPath = this.config.get(CONFIG_OPTIONS.projectsPath) || "";

    //THIS IS NO CONFIGURABLE VIA A COMMAND
    this.sameWindow = this.config.get(CONFIG_OPTIONS.sameWindow) || true;
  }

  async saveConfiguration() {
    await this.config.update(
      CONFIG_OPTIONS.projectsPath,
      this.projectsPath,
      vscode.ConfigurationTarget.Global
    );
  }

  async selectProjectsPath() {
    const folderUri = await vscode.window.showOpenDialog({
      canSelectFolders: true,
      canSelectMany: false,
      canSelectFiles: false,
      openLabel: "Chose your projects folder",
    });

    if (!folderUri || folderUri.length === 0) {
      return;
    }

    this.projectsPath = folderUri[0].fsPath;
  }
}
