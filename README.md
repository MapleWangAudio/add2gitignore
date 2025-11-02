# Add to Gitignore

English | [中文](#中文说明)

## Overview

Add2Gitignore lets you right-click any file or folder in the VS Code Explorer and instantly append it to the nearest Git repository's `.gitignore` file. In multi-root or large workspaces containing several Git repos, it walks upward from the selected path to find the closest `.git` directory so you always update the correct `.gitignore`.

## Features

* Finds the nearest Git repository root (searches for a `.git` directory upward)
* Creates `.gitignore` automatically if missing
* Prevents duplicate ignore entries (handles directory trailing slash variants)
* Normalizes path separators to forward slashes for cross‑platform consistency

## Usage

1. Open a VS Code workspace that contains one or more Git repositories.
2. In the Explorer, right‑click a target file or folder.
3. Choose the context menu command: **Add to .gitignore**.
4. A notification appears confirming the entry was added (or already existed).

## Development

```powershell
npm install
npm run compile
npm run package
```

Launch the extension in the VS Code debugger using the "Run Extension" configuration.

## Release Notes

See `CHANGELOG.md` for version history.

## License

MIT License. See `LICENSE`.

---

## 中文说明

在 VS Code 资源管理器中右键单击任意文件或文件夹，选择 **Add to .gitignore** 命令，插件会自动向上查找距离该路径最近的 Git 仓库根目录，并将该条目追加到该仓库根目录下的 `.gitignore` 文件中（若不存在则创建）。

### 功能特性

* 自动向上查找最近的 Git 仓库（识别 `.git` 文件夹）
* 若仓库根目录不存在 `.gitignore` 文件则自动创建
* 避免重复添加已有忽略项（处理目录结尾斜杠差异）
* 统一使用 `/` 作为路径分隔符，跨平台一致

### 使用方法

1. 在 VS Code 中打开任意包含 Git 仓库的工作区。
2. 在资源管理器中右键单击目标文件或文件夹。
3. 选择上下文菜单中的 **Add to .gitignore**。
4. 执行成功后会弹出提示；如已存在则提示无需重复添加。

### 开发与调试

```powershell
npm install
npm run compile
npm run package
```

在调试面板中选择 "Run Extension" 启动调试。

### 许可证

MIT 许可证。详见 `LICENSE` 文件。
