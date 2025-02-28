import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import QuickProjectsConfiguration from "../../config/configuration";

export default class QuickSwitch {
  config: QuickProjectsConfiguration = new QuickProjectsConfiguration();

  private async openProject(projectPath: string){
    await vscode.commands.executeCommand(
        "vscode.openFolder",
        vscode.Uri.file(projectPath),
        !this.config.sameWindow
    );
  }

  async switchProject() {
    if (!this.config.projectsPath) {
      return;
    }
    const subfolders = fs.readdirSync(this.config.projectsPath);
    if (subfolders.length === 0) {
      vscode.window.showInformationMessage("No projects folder configured");
    }

    const selectedProject = await vscode.window.showQuickPick(subfolders, {
      placeHolder: "Select a project",
    });

    if (!selectedProject) {
      return;
    }

    const projectPath = path.join(this.config.projectsPath, selectedProject);

    await this.openProject(projectPath);
  }
}
