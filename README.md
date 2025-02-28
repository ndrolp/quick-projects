# QuickSwitch VS Code Extension

QuickSwitch is a simple and efficient Visual Studio Code extension that allows you to easily switch between different projects (subfolders) in a configured folder. The extension enables you to quickly select a project folder from your predefined workspace and open it either in the same window or in a new window.

## Features

- **Project Selection**: Lists subfolders in a configured `Projects Folder` to choose from.
- **Folder Customization**: Choose your folder path where projects are stored.
- **Workspace Switching**: Open the selected project in the same window or a new window.
- **Seamless Integration**: Easy-to-use command and settings for a smooth user experience.

## Installation

1. Open **VS Code**.
2. Navigate to the **Extensions View** (`Ctrl+Shift+X` or `Cmd+Shift+X` on macOS).
3. Search for `QuickSwitch`.
4. Click **Install**.

Alternatively, you can manually install the extension by downloading it from the [VS Code Marketplace](https://marketplace.visualstudio.com/).

## Configuration

Before using the extension, you need to configure the **Projects Folder Path** where your projects are stored.

1. Open **Command Palette** (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
2. Type **Preferences: Open Settings (JSON)**.
3. Add the following settings to your `settings.json`:

```json
{
    "quick-projects.ProjectsFolderPath": "/path/to/your/projects/folder",
    "quick-projects.OpenSameWindow": true
}
