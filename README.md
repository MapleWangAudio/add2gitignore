# Add to Gitignore

在 VS Code 资源管理器中右键单击任意文件或文件夹，选择 **Add to .gitignore** 命令，插件会自动找到距离该路径最近的 Git 仓库根目录，并将对应条目追加到该仓库根目录下的 `.gitignore` 文件中。

## 功能特性

- 自动向上查找最近的 Git 仓库（识别 `.git` 文件夹）
- 若仓库根目录不存在 `.gitignore` 文件，则自动创建
- 避免重复添加已有的忽略项
- 保持跨平台路径格式（统一为 `/`）

## 使用方法

1. 在 VS Code 中打开任意包含 Git 仓库的工作区。
2. 在资源管理器中右键单击目标文件或文件夹。
3. 选择上下文菜单中的 **Add to .gitignore**。
4. 命令执行成功后，会弹出提示告知操作结果。

## 开发与调试

```bash
npm install
npm run compile
```

> 首次运行之前，请确保已安装最新版本的 VS Code，并在调试面板中选择 "Run Extension" 进行调试。

## 许可协议

本项目使用 MIT 许可协议。
