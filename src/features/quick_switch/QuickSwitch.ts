import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import QuickProjectsConfiguration from "../../config/configuration";
import { exec } from "child_process";
import WslSupport from "../../utils/WslSupport";

export default class QuickSwitch {
  config: QuickProjectsConfiguration = new QuickProjectsConfiguration();

  private async openProject(projectPath: string) {
    await vscode.commands.executeCommand(
      "vscode.openFolder",
      WslSupport.isWslPath(projectPath)
        ? WslSupport.parseWslUri(projectPath)
        : vscode.Uri.file(projectPath),
      !this.config.sameWindow
    );
  }

  async switchProject() {
    if (!this.config.projectsPath) {
      return;
    }
    let subfolders =
      WslSupport.isInsideWSL() && WslSupport.isWslPath(this.config.projectsPath)
        ? WslSupport.readWslProjects(this.config.projectsPath)
        : fs.readdirSync(this.config.projectsPath, {
            withFileTypes: true,
          });

    //const subfolders: fs.Dirent[] = [];
    const projects = subfolders
      .filter((dirent) => dirent.isDirectory())
      .map((folder) => folder.name);
    if (projects.length === 0) {
      vscode.window.showInformationMessage("No projects folder configured");
    }

    const selectedProject = await vscode.window.showQuickPick(projects, {
      placeHolder: "Select a project",
    });

    if (!selectedProject) {
      return;
    }

    const projectPath = path.join(this.config.projectsPath, selectedProject);

    await this.openProject(projectPath);
  }

  async createProject() {
    if (!this.config.projectsPath) {
      return;
    }

    const newProjectName = await vscode.window.showInputBox({
      placeHolder: "New project name",
    });

    if (!newProjectName) {
      return;
    }

    const newProjectPath = path.join(this.config.projectsPath, newProjectName);
    fs.mkdirSync(newProjectPath);

    await this.openProject(newProjectPath);
  }

  async cloneProject() {
    const repoUrl = await vscode.window.showInputBox({
      prompt: "Enter the GIT repository URL to clone",
      placeHolder: "Repo URL",
    });

    if (!repoUrl || !this.config.projectsPath) {
      return;
    }

    const projectName =
      (await vscode.window.showInputBox({
        prompt:
          "Enter the project name, this will be the name of thje destination folder",
        placeHolder: "Project name",
      })) || path.basename(repoUrl, ".git");

    const newProjectPath = path.join(this.config.projectsPath, projectName);

    const command = `git clone ${repoUrl} "${newProjectPath}"`;

    vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: "Cloning project...",
        cancellable: false,
      },
      async () => {
        exec(command, (err, _, stderr) => {
          if (err) {
            vscode.window.showErrorMessage(`Git clone failed: ${stderr}`);
          }
          if (!this.config.projectsPath) {
            return;
          }
          this.openProject(path.join(this.config.projectsPath, projectName));
        });
      }
    );
  }
}
