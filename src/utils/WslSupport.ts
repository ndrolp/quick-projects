import * as vscode from "vscode";
import * as fs from "fs";

export default class WslSupport {
  static isInsideWSL(): boolean {
    return vscode.env.remoteName === "wsl";
  }

  static isWslPath(path: string): boolean {
    const match = path.match(/^\\\\wsl\.localhost\\([^\\]+)\\(.+)$/);

    if (!match) {
      return false;
    }

    return true;
  }
  static parseWslUri(path: string) {
    const match = path.match(/^\\\\wsl\.localhost\\([^\\]+)\\(.+)$/);
    if (!match) {
      return path;
    }
    const distro = match[1];
    const wslPath = match[2].replace(/\\/g, "/"); // Convert backslashes to slashes

    return vscode.Uri.parse(`vscode-remote://wsl+${distro}/${wslPath}`);
  }

  static readWslProjects(path: string): fs.Dirent[] {
    const match = path.match(/^\\\\wsl\.localhost\\[^\\]+\\(.+)$/);
    if (!match) {
      vscode.window.showErrorMessage("Invalid WSL path format.");
      return [];
    }
    const linuxPath = `/${match[1].replace(/\\/g, "/")}`;
    return fs.readdirSync(linuxPath, { withFileTypes: true });
  }
}
