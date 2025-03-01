import * as vscode from "vscode";
import QuickProjectsConfiguration from "./config/configuration";
import QuickProjectsVariables from "./config/variables";
import QuickSwitch from "./features/quick_switch/QuickSwitch";

export const QUICK_PROJECTS_COMMANDS = {
  pickProjectsFolder: `${QuickProjectsVariables.identifier}.pick-projects-folder`,
  switchProject: `${QuickProjectsVariables.identifier}.switch-project`,
  createProject: `${QuickProjectsVariables.identifier}.create-project`,
  cloneProject: `${QuickProjectsVariables.identifier}.clone-project`,
};

export function activate(context: vscode.ExtensionContext) {
  let choseProjectsFolder = vscode.commands.registerCommand(
    QUICK_PROJECTS_COMMANDS.pickProjectsFolder,
    async () => {
      const config = new QuickProjectsConfiguration();
      await config.selectProjectsPath();
      await config.saveConfiguration();
    }
  );

  const switchProject = vscode.commands.registerCommand(
    QUICK_PROJECTS_COMMANDS.switchProject,
    async () => {
      const quickSwitch = new QuickSwitch();
      await quickSwitch.switchProject();
    }
  );

  const createProject = vscode.commands.registerCommand(
    QUICK_PROJECTS_COMMANDS.createProject,
    async () => {
      const quickSwitch = new QuickSwitch();
      await quickSwitch.createProject();
    }
  );

  const cloneProject = vscode.commands.registerCommand(
    QUICK_PROJECTS_COMMANDS.cloneProject,
    async () => {
      const quickSwitch = new QuickSwitch();
      quickSwitch.cloneProject();
    }
  );

  context.subscriptions.push(
    choseProjectsFolder,
    switchProject,
    createProject,
    cloneProject
  );
}

export function deactivate() {}
