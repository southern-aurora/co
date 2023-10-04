---
outline: deep
---

# 安装

`co` 本质是单个可执行二进制文件，所以安装起来非常简单。

## 自动安装

你可以通过 `npm` 或 `bun` 来快速安装和你系统与 CPU 类型相符的版本，下面以 `npm` 为例：

```sh
npm install --global co-win-x64@2.2.0
```

```sh
npm install --global co-linux-x64@2.2.0
```

```sh
npm install --global co-linux-arm64@2.2.0
```

```sh
npm install --global co-macos-x64@2.2.0
```

```sh
npm install --global co-macos-arm64@2.2.0
```

## 手动安装

如果你没有 `npm` 或 `bun` (对于 `deno` 或其他语言的用户来说)，可以直接下载二进制文件，然后将其放到你的全局环境变量中。

例如，对于 Linux 用户，你可以通过以下命令来下载和安装 (假设使用 linux-x64 版本)：

```sh
cd /tmp \
&& wget "https://cdn.npmmirror.com/packages/co-linux-x64/2.2.0/co-linux-x64-2.2.0.tgz" \
&& tar -xzf co-linux-x64-2.2.0.tgz \
&& mv /tmp/package/co /usr/bin/co \
&& chmod 777 /usr/bin/co
```

对于 Mac 用户，操作和 Linux 用户类似，只是略有不同，且下载的是 macos-x64 或 macos-arm64 版本。

如果你使用 Windows 的话，可以通过以下命令将 `C:\` 设置到 `PATH` 中。这样的话，你将任何可执行文件，包括 `co.exe` 放到 `C:\` 中，就可以直接在命令行中运行它们。注意：需要使用 `PowerShell` 运行，不要使用 `CMD`。

你可能需要重启 PowerShell 或 Windows，才能使这些操作生效。

```ps1
[environment]::SetEnvironmentvariable("PATH", "$([environment]::GetEnvironmentvariable("Path", "Machine"));C:\", "Machine");
```

## 初始化

在你的工程目录中，运行：

```sh
co
```

然后跟着提示操作即可！

如果你是 JavaScript 开发者，请选择你计划在这个工程中使用的包管理器。

如果你是其他语言的开发者，请选择 `custom`。

最终，将会为你创建一个 `.co.toml` 文件。
