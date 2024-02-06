# co

再也别想该用啥包管理器了！

## co 是怎样诞生的

我是一个 JavaScript 开发者。在 JavaScript 社区中，有许多包管理器，例如 `npm`、`bun`、`yarn`、`pnpm`、`cnpm` 等等……

在不同的项目中，安装一个包之前，首先要回忆这个项目所使用的包管理器，然后再运行相应的命令。

由于肌肉记忆，我经常习惯性地在那些 `yarn`、`pnpm`、`bun` 项目中错误运行 `npm i`，这种感觉实在是太痛苦了……

为了解决这个问题，我编写了 `co`，你可以通过一套相同的命令，来自由地根据不同项目，执行不同的包管理器命令。

实现这样魔法的背后，是 `co` 的命令别名引擎，就像 `npm` 中，`package.json` 的 `scripts` 一样，但是更加强大。

对于 `deno` 以及其他的语言来说，他们没有类似命令别名的支持，`co` 也能帮助他们获得一个更强大的命令别名引擎。

## 自动安装

`co` 本质是单个可执行二进制文件，你可以通过 `npm` 来快速安装和你系统与 CPU 类型相符的版本：

```sh
npm install --global 你的版本
```

如果你正在使用 Bun，也同样可以安装：

```sh
bun add --global 你的版本
```

可选的版本有：

```sh
co-win-x64@3.0.2
```

```sh
co-linux-x64@3.0.2
```

```sh
co-linux-arm64@3.0.2
```

```sh
co-macos-x64@3.0.2
```

```sh
co-macos-arm64@3.0.2
```

## 手动安装

如果你没有 `npm` (对于 `deno` 或其他语言的用户来说)，可以直接下载二进制文件，然后将其放到你的全局环境变量中。

例如，对于 Linux 用户，你可以通过以下命令来下载和安装 (假设使用 linux-x64 版本)：

```sh
cd /tmp \
&& wget "https://cdn.npmmirror.com/packages/co-linux-x64/3.0.2/co-linux-x64-3.0.2.tgz" \
&& tar -xzf co-linux-x64-3.0.2.tgz \
&& mv /tmp/package/co /usr/bin/co \
&& chmod 777 /usr/bin/co
```

对于 Mac 用户，操作和 Linux 用户类似，只是略有不同，且下载的是 macos-x64 或 macos-arm64 版本。

如果你使用 Windows 的话，可以通过以下命令将 `C:\` 设置到 `PATH` 中。这样的话，你将任何可执行文件，包括 `co.exe` 放到 `C:\` 中，就可以直接在命令行中运行它们。注意：需要使用 `PowerShell` 运行，不要使用 `CMD`。

你可能需要重启 PowerShell 或 Windows，才能使这些操作生效。

```ps1
[environment]::SetEnvironmentvariable("PATH", "$([environment]::GetEnvironmentvariable("Path", "Machine"));C:\", "Machine");
```

## 卸载

如果你通过 `npm` 安装，可以通过以下命令卸载：

```sh
npm uninstall --global co-linux-x64
npm uninstall --global co-linux-arm64
npm uninstall --global co-macos-x64
npm uninstall --global co-macos-arm64
npm uninstall --global co-win-x64
```

## 初始化

在你的工程目录中，运行：

```sh
co
```

然后跟着提示操作即可！请选择你计划在这个工程中使用的包管理器。

最终，将会为你创建一个 `.co.toml` 文件。

## 命令

在上一步的初始化章节中，你选择了你计划在此项目中使用的包管理器，接着，你就可以自由使用下面这些命令了！

通常，我们启动项目的开发会运行 `npm run dev`，现在，你只需要使用 `co dev`：

```sh
co dev
```

以及，你想要安装包 `lodash`，你可以这样做：

```sh
co install lodash
co add lodash
co i lodash
co a lodash
```

是的，以上每个命令都是等价的。他们只是同一个操作的不同别名，这是为了照顾不同包管理器习惯的使用者。

在背后，`co` 会根据你不久前为项目选择的包管理器预设，自动转化为你所使用的具体的包管理器的命令：

```sh
npm install --save lodash
yarn add lodash
pnpm add lodash
bun add lodash
```

对于常用的操作，`co` 也贴心地为你提供了统一的缩写，例如，将 `eslint` 安装到全局：

```
co install:global eslint
co add:global eslint
co i:g eslint
co a:g eslint
```

你可以通过阅读这一份[别名列表](./ALIAS_LIST.md)，来了解 `co` 的预设为你提供了哪些别名。

## 更多

除了帮助您统一软件包管理器命令之外，bun 还可以帮助简化一些常见命令（例如 git）。这些是可选的，您可以根据自己的喜好将它们添加到您的项目中。

### Git

在你的 `.co.toml` 中的 `includes`，添加 `co:git` 即可启用。

```toml
["general"]
includes = ["co:npm", "co:git"]
```

可用的命令参见 [Git 别名列表](./GIT_ALIAS_LIST.md)

## 来自社区

命令以 co:开头的是内置命令。您还可以使用来自社区的命令，只需提供一个 http(s) 链接或相对路径 (`./` 或 `~/`)。如果您提供了一个链接，我们会假设它是不会变化的。该命令将在首次运行时从网络下载并缓存在~/.co-temps 中，然后在每次运行时从缓存中运行，除非缓存文件被删除，否则不会再次重新下载。

如果你想写自己的 co 脚本，请阅读[编写指南](./WRITING_GUIDE.md)。
