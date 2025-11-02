import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const fsp = fs.promises;

export function activate(context: vscode.ExtensionContext) {
    // Command id must match package.json contributes.commands.command
    const disposable = vscode.commands.registerCommand('add2gitignore.addEntry', async (uri: vscode.Uri) => {
        if (!uri) {
            vscode.window.showErrorMessage('未获取到需要添加的文件或文件夹。');
            return;
        }

        try {
            await addToGitignore(uri);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            vscode.window.showErrorMessage(`添加到 .gitignore 失败：${message}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
    // no-op
}

async function addToGitignore(uri: vscode.Uri) {
    const targetPath = uri.fsPath;
    const targetStat = await fsp.lstat(targetPath);
    const searchStart = targetStat.isDirectory() ? targetPath : path.dirname(targetPath);
    const repoRoot = await findNearestGitRepo(searchStart);

    if (!repoRoot) {
        throw new Error('未找到包含该路径的 Git 仓库。');
    }

    const gitignorePath = path.join(repoRoot, '.gitignore');

    await ensureGitignoreExists(gitignorePath);

    const relative = path.relative(repoRoot, targetPath).replace(/\\/g, '/');
    if (!relative) {
        throw new Error('请勿直接将仓库根目录添加到 .gitignore。');
    }

    const entry = targetStat.isDirectory() && !relative.endsWith('/') ? `${relative}/` : relative;

    const alreadyIgnored = await isEntryAlreadyIgnored(gitignorePath, entry, targetStat.isDirectory());
    if (alreadyIgnored) {
        vscode.window.showInformationMessage('该条目已存在于 .gitignore 中。');
        return;
    }

    await appendEntry(gitignorePath, entry);
    vscode.window.showInformationMessage(`已将 ${entry} 添加到最近仓库的 .gitignore。`);
}

async function ensureGitignoreExists(gitignorePath: string) {
    try {
        await fsp.access(gitignorePath, fs.constants.F_OK);
    } catch (error) {
        await fsp.writeFile(gitignorePath, '', { encoding: 'utf8' });
    }
}

async function isEntryAlreadyIgnored(gitignorePath: string, entry: string, isDirectory: boolean) {
    const content = await fsp.readFile(gitignorePath, 'utf8');
    const normalizedEntry = entry.trim();
    const comparable = isDirectory && normalizedEntry.endsWith('/')
        ? [normalizedEntry, normalizedEntry.slice(0, -1)]
        : [normalizedEntry];

    return content
        .split(/\r?\n/)
        .map((line: string) => line.trim())
        .some((line: string) => comparable.includes(line));
}

async function appendEntry(gitignorePath: string, entry: string) {
    const entryLine = entry.endsWith('\n') ? entry : `${entry}\n`;
    const current = await fsp.readFile(gitignorePath, 'utf8');
    const needsNewline = current.length > 0 && !current.endsWith('\n');
    const data = `${needsNewline ? '\n' : ''}${entryLine}`;
    await fsp.appendFile(gitignorePath, data, { encoding: 'utf8' });
}

async function findNearestGitRepo(startPath: string) {
    let current = startPath;

    for (; ;) {
        const gitPath = path.join(current, '.git');
        if (await pathExists(gitPath)) {
            return current;
        }

        const parent = path.dirname(current);
        if (parent === current) {
            return undefined;
        }
        current = parent;
    }
}

async function pathExists(target: string) {
    try {
        await fsp.access(target, fs.constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
}
