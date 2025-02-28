import * as vscode from 'vscode';
import QuickProjectsConfiguration from './config/configuration';
import QuickProjectsVariables from './config/variables';
import QuickSwitch from './features/quick_switch/QuickSwitch';

export const QUICK_PROJECTS_COMMANDS = {
    pickProjectsFolder: `${QuickProjectsVariables.identifier}.pick-projects-folder`,
    switchProject: `${QuickProjectsVariables.identifier}.switch-project`
};

export function activate(context: vscode.ExtensionContext) {
    let choseProjectsFolder = vscode.commands.registerCommand(QUICK_PROJECTS_COMMANDS.pickProjectsFolder, async () => {
        const config = new QuickProjectsConfiguration();
        await config.selectProjectsPath();
        await config.saveConfiguration();
    });

    const switchProject = vscode.commands.registerCommand(QUICK_PROJECTS_COMMANDS.switchProject, async () => {
        const quickSwitch = new QuickSwitch();
        await quickSwitch.switchProject();
    });

    context.subscriptions.push(choseProjectsFolder, switchProject);
}

export function deactivate() { }
