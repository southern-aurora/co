# co

Give your muddled scripts a memorable alias!

为你冗长繁杂的脚本们设置一个简单易记的别名！

## How was co born / co 是怎样诞生的

I'm a JavaScript developer. In the JavaScript community, there are many package managers such as `npm`, `yarn`, `pnpm`, `bun`...

我是一个 JavaScript 开发者。在 JavaScript 社区中，有许多包管理器，例如 `npm`、`yarn`、`pnpm`、`bun` 等等。

In different projects, before installing a package, you must first recall the package manager used by the project, and then run the corresponding command.

在不同的项目中，安装一个包之前，首先要回忆这个项目所使用的包管理器，然后再运行相应的命令。

Due to muscle memory, I often habitually run `npm i` incorrectly in those `yarn`, `pnpm`, and `bun` projects. This feeling is really painful...

由于肌肉记忆，我经常习惯性地在那些 `yarn`、`pnpm`、`bun` 项目中错误运行 `npm i`，这种感觉实在是太痛苦了……

To solve this problem, I wrote `co`, which allows you to freely execute different package manager commands according to different projects through the same set of commands.

为了解决这个问题，我编写了 `co`，你可以通过一套相同的命令，来自由地根据不同项目，执行不同的包管理器命令。

Behind the implementation of such magic is the command alias function of `co`, which is just like the `scripts` of `package.json` in `npm`, but more powerful.

实现这样魔法的背后，是 `co` 的命令别名功能，就像 `npm` 中，`package.json` 的 `scripts` 一样，但是更加强大。

For `deno` and other languages, they do not have similar command alias support, `co` can also help them obtain a more powerful command alias function.

对于 `deno` 以及其他的语言来说，他们没有类似命令别名的支持，`co` 也能帮助他们获得一个更强大的命令别名功能。

## Quick install / 自动安装

`co` is essentially a single executable binary file. You can use `npm` to quickly install the version that matches your System and CPU type:

`co` 本质是单个可执行二进制文件，你可以通过 `npm` 来快速安装和你系统与 CPU 类型相符的版本：

```sh
npm install --global co-win-x64@1.3.0
```

```sh
npm install --global co-linux-x64@1.3.0
```

```sh
npm install --global co-linux-arm64@1.3.0
```

```sh
npm install --global co-macos-x64@1.3.0
```

```sh
npm install --global co-macos-arm64@1.3.0
```

## Manual install / 手动安装

If you don't have `npm` (for `deno` or other language users), you can download the binary directly and put it in your global environment variables.

如果你没有 `npm` (对于 `deno` 或其他语言的用户来说)，可以直接下载二进制文件，然后将其放到你的全局环境变量中。

For example, for Linux users, you can download and install with the following commands (assuming you are using the linux-x64 version):

例如，对于 Linux 用户，你可以通过以下命令来下载和安装 (假设使用 linux-x64 版本)：

```sh
cd /tmp \
&& wget "https://cdn.npmmirror.com/packages/co-linux-x64/1.3.0/co-linux-x64-1.3.0.tgz" \
&& tar -xzf co-linux-x64-1.3.0.tgz \
&& mv /tmp/package/co /usr/bin/co \
&& chmod 777 /usr/bin/co
```

For Mac users, the operation is similar to Linux users, but slightly different, and the downloaded version is macos-x64 or macos-arm64.

对于 Mac 用户，操作和 Linux 用户类似，只是略有不同，且下载的是 macos-x64 或 macos-arm64 版本。

If you are using Windows, you can set `C:\` to `PATH` with the following command. This way, you can run any executable file, including `co.exe`, directly from the command line by placing it in `C:\`. Note: You need to use `PowerShell` to run, do not use `CMD`.

如果你使用 Windows 的话，可以通过以下命令将 `C:\` 设置到 `PATH` 中。这样的话，你将任何可执行文件，包括 `co.exe` 放到 `C:\` 中，就可以直接在命令行中运行它们。注意：需要使用 `PowerShell` 运行，不要使用 `CMD`。

You may need to restart PowerShell or Windows for these operations to take effect.

你可能需要重启 PowerShell 或 Windows，才能使这些操作生效。

```ps1
[environment]::SetEnvironmentvariable("PATH", "$([environment]::GetEnvironmentvariable("Path", "Machine"));C:\", "Machine");
```

## Uninstall / 卸载

If you installed via `npm`, you can uninstall with the following command:

如果你通过 `npm` 安装，可以通过以下命令卸载：

```sh
npm uninstall --global co-linux-x64
npm uninstall --global co-linux-arm64
npm uninstall --global co-macos-x64
npm uninstall --global co-macos-arm64
npm uninstall --global co-win-x64
```

## Initialization / 初始化

In your project directory, run:

在你的工程目录中，运行：

```sh
co
```

OK! Then just follow the prompts!

然后跟着提示操作即可！

If you are a JavaScript developer, choose the package manager you plan to use for this project.

如果你是 JavaScript 开发者，请选择你计划在这个工程中使用的包管理器。

If you are a developer in other languages, please select `custom`.

如果你是其他语言的开发者，请选择 `custom`。

Eventually, a `.co.toml` file will be created for you.

最终，将会为你创建一个 `.co.toml` 文件。

## Commands / 命令

Be patient! I'll start by showing JavaScript developers how to use `co` to avoid the pain of remembering different package manager commands. If you are a developer of other languages, you can jump directly to the [Custom_Command](https://github.com/akirarika/co#custom-commands--%E8%87%AA%E5%AE%9A%E4%B9%89%E5%91%BD%E4%BB%A4) chapter

稍安勿躁！我先向 JavaScript 开发者们介绍一下，如何使用 `co` 来避免回忆不同包管理器命令的痛苦。如果你是其他语言的开发者，可以直接跳转到[自定义命令](https://github.com/akirarika/co#custom-commands--%E8%87%AA%E5%AE%9A%E4%B9%89%E5%91%BD%E4%BB%A4)章节

In the initialization section of the previous step, you selected the package manager you planned to use for this project. Then, you are free to use the following commands!

在上一步的初始化章节中，你选择了你计划在此项目中使用的包管理器，接着，你就可以自由使用下面这些命令了！

For example, if you want to install the package `lodash`, you can do this:

例如，你想要安装包 `lodash`，你可以这样做：

```sh
co install lodash
co add lodash
co i lodash
co a lodash
```

Yes, each of the above commands is equivalent. They are just different aliases for the same operation. This is to take care of users with different package manager habits.

是的，以上每个命令都是等价的。他们只是同一个操作的不同别名，这是为了照顾不同包管理器习惯的使用者。

Behind the scenes, `co` will automatically translate into commands for the specific package manager you are using based on the package manager default you selected for your project not long ago:

在背后，`co` 会根据你不久前为项目选择的包管理器预设，自动转化为你所使用的具体的包管理器的命令：

```sh
npm install --save lodash
yarn add lodash
pnpm add lodash
bun add lodash
```

For common operations, `co` also thoughtfully provides you with unified abbreviations, for example, installing `eslint` to global:

对于常用的操作，`co` 也贴心地为你提供了统一的缩写，例如，将 `eslint` 安装到全局：

```
co install:global eslint
co add:global eslint
co i:g eslint
co a:g eslint
```

You can read the alias list below to see what aliases `co` provides you with by default.

可以通过阅读下面的别名列表，来了解 `co` 的预设为你提供了哪些别名。

## Alias List (JavaScript Package Manager) / 别名列表 (JavaScript 包管理器)

### Run Script / 运行脚本

Alias: `run`, `r`

Compare NPM: `npm run`

```sh
co r dev
```

### Execute (npx) / 执行 (npx)

Alias: `execute`, `x`

Compare NPM: `npx`

```sh
co x prisma
```

### Installation dependencies / 安装依赖

Alias: `install`, `i`, `add`, `a`

Compare NPM: `npm install`

```sh
co i
```

### install a package / 安装一个包

Alias: `install`, `i`, `add`, `a`

Compare NPM: `npm install --save`

```sh
co i lodash
```

### Install a package (to development environment) / 安装一个包 (至开发环境)

Alias: `install:dev`, `i:d`, `add:dev`, `a:d`

Compare NPM: `npm install --save-dev`

```sh
co i:d typescript
```

### Install a package (to global) / 安装一个包 (至全局)

Alias: `install:global`, `i:g`, `add:global`, `a:g`

Compare NPM: `npm install --global`

```sh
co i:g typescript
```

### Update dependencies / 更新依赖

Alias: `update`, `up`, `upgrade`

Compare NPM: `npm upgrade`

```sh
co up
```

### Uninstall a package / 卸载一个包

Alias: `uninstall`, `un`, `remove`, `rm`

Compare NPM: `npm uninstall`

```sh
co rm jquery
```

## Custom commands / 自定义命令

In the `.co.toml` file, you can customize commands, which are very powerful.

在 `.co.toml` 文件中，你可以自定义命令，功能非常强大。

If you are a JavaScript developer, you should understand this function well. It works like `package.json -> scripts`.

如果你是 JavaScript 开发者，应该很好理解这个功能，它的作用就像 `package.json -> scripts`。

A simple `Hello World` command looks like this:

一个简单的 `Hello World` 命令如下：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo 'hello world'",
]
```

When you type `co say` or `co speak` or `co echo`, the output will be:

当你输入 `co say` 或 `co speak` 或 `co echo` 时，将会输出：

```sh
hello world
```

### Global configuration / 全局配置

You may have noticed that the `.co.toml` automatically created for you contains a `mixins` of `~/.co.toml`.

你可能注意到了，为你自动创建的 `.co.toml` 中，包含一个 `~/.co.toml` 的 `mixins`。

Yes, this is the location where our conventional global configuration files are stored. You can define your global commands here on your computer.

是的，这是我们约定俗成的全局配置文件所存放的位置。你可以在你的电脑中的此处定义你的全局命令。

When you run a command in a directory that has not initialized `co`, `co` will automatically load the commands in the global configuration file.

当你在没有初始化过 `co` 的目录中运行命令时，`co` 会自动加载全局配置文件中的命令。

### Multiple scripts / 多条脚本

You can write multiple scripts in `scripts`, for example:

你可以在 `scripts` 中写入多条脚本，例如：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo 'hello world 1'",
    "echo 'hello world 2'",
    "echo 'hello world 3'",
]
```

The script will be executed in sequence. Once any command fails to execute, the execution of subsequent commands will be automatically terminated.

脚本将按照顺序依次执行，一旦有任一命令执行失败，将会自动终止后续命令的执行。

Each script will have a new context. For example, the variables set in the previous script will disappear in the next one, and the directory switched using the `cd` command will be reset.

每条脚本都将会是全新的上下文，例如在上条脚本中设置的变量在下一条会消失、使用 `cd` 命令切换的目录将重置。

### Environment variables / 环境变量

You can define additional environment variables in `env` so that you don't have to worry about script compatibility issues in setting environment variables on different systems.

你可以在 `env` 中定义额外的环境变量，这样你就不必考虑在不同系统下设置环境变量的脚本兼容性问题了。

```toml
["say"]
env = { SAY1 = "hello world 1", SAY2 = "hello world 2" }
commands = ["say", "speak", "echo"]
scripts = ["echo $SAY1"]
```

### Insert variables into script / 脚本中插入变量

The script supports template syntax, and variables can be inserted through `<%= yourVar %>`.

脚本支持模板语法，可通过 `<%= yourVar %>` 的方式插入变量。

The default variables have the values of all environment variables, as well as two special variables, `args` and `argsArr`:

默认的变量有所有的环境变量的值，以及两个特殊变量，`args` 和 `argsArr`：

`args` is a string representing additional parameters entered by the user, such as `hello world` in `co say hello world`.

`args` 是字符串，代表用户所输入的额外参数，如 `co say hello world` 中的 `hello world`。

`argsArr` is its array form, such as `["hello", "world"]`.

`argsArr` 是其的数组形式，如 `["hello", "world"]`。

For example, we can output the parameters entered by the user as follows:

例如，我们可以像下面这样，将用户输入的参数，来输出：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo '<%= args %>'",
]
```

### Insert expression into script / 脚本中插入表达式

The script runs in a JavaScript environment, so it supports any JavaScript expression. For example, you can output good morning or good afternoon depending on the time:

脚本运行在 JavaScript 环境中，因此支持任何 JavaScript 表达式，例如，你可以根据时间不同，来输出上午好或下午好：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo '<%= new Date().getHours() > 12 ? '☀️Good morning!' : '🌖Good afternoon!' %>'",
]
```

### Execute the local package command in "node_modules" / 执行 node_modules 中的本地包命令

When writing JavaScript, we sometimes install packages with commands that we don't want to install globally.

编写 JavaScript 时，我们有时会安装一些带有命令的包，但我们有时又不想安装到全局。

the `typescript` package comes with a command named `tsc`, and it is easy to call these local commands.

`typescript` 包自带了名为 `tsc` 的命令，想调用这些局部的命令很简单。

For example, below we write a function to find the path where the `tsc` command is located:

例如，下面我们编写一个查找 `tsc` 命令所在路径的功能：

```toml
["where is tsc"]
commands = ["where-is-tsc", "wt"]
scripts = [
    "echo tsc in: <%= loadNodeModuleBin('typescript', 'tsc') %>",
]
```

### Insert JavaScript into script / 脚本中插入 JavaScript

You can even write JavaScript code directly in it to achieve process control.

你甚至可以直接在里面编写 JavaScript 代码，实现流程控制。

The code between `<% %>` will be executed, and the code between `<%= %>` will be output.

`<% %>` 之间的代码将会被执行，而 `<%= %>` 之间的代码将会被输出。

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    '''
    <% if (new Date().getHours() > 12) {%>
        echo '☀️Good morning!'
    <% } else {%>
        echo '🌖Good afternoon!'
    <% } %>
    '''
]
```

Note that in the above code example, three consecutive quotation marks `'''`` are used to represent a multi-line string, which is the syntax of TOML.

注意，以上代码示例中，使用了三个连续的引号 `'''` 代表多行字符串，这是 TOML 的语法。

The `co` it will automatically help you delete **all newlines**. Therefore, you don't need to worry about these newlines affecting the execution of your script.

`co` 会自动帮助你在每行末尾添加空格，并删掉**所有的换行**。你在编写脚本时，不需要担心换行符的影响。

### Should you use template syntax? / 该使用模板语法吗？

The reason why template syntax is introduced in `co` is to make the configuration compatible with multiple platforms as much as possible. If some people in your team use Mac and some use Windows, this will be a headache.

在 `co` 中引入模板语法，是为了尽可能地让配置可以兼容多个平台。如果你的团队中有些人用 Mac 而有些人用 Windows，这将会是一件很头疼的事情。

At the same time, in order to improve the expression ability of the script, so that you can write more complex logic in the script. Writing JavaScript code is much simpler than writing shell scripts. and, can run normally on different systems.

同时，也为了提高脚本的表达能力，让你可以在脚本中编写更加复杂的逻辑。编写 JavaScript 代码，比编写 shell 脚本，要简单得多，且可以在不同系统下正常运行。

But template syntax is not the best choice. It has no highlighting, no code prompts and syntax checks, which will make you feel uncomfortable when writing complex scripts.

但是模板语法并不是最好的选择，它没有高亮，也没有代码提示和语法检查，这将会让你在编写较复杂的脚本时，感到很不舒服。

If you think that the script logic you want to write is too complicated to use template syntax, please consider whether to use the script language you are familiar with to write the script, and then execute the script through `co`.

如果你认为所要编写的脚步逻辑复杂到了使用模板语法感到吃力的情况时，请考虑是否使用你熟悉的脚本语言来编写脚本，然后通过 `co` 来执行这个脚本。

### PowerShell 兼容

We usually want the command to stop automatically when an error is encountered, and to run multiple commands in one script. Therefore, we often write scripts like this:

我们通常希望命令在遇到错误时自动停止，且在一条脚本中运行多条命令。因此，我们经常编写这样的脚本：

```sh
cd ~ && cd .ssh && cat id_rsa.pub
```

But in PowerShell, the command will not stop when it encounters an error, and the `&&` symbol cannot be used to run multiple consecutive commands.

但在 PowerShell 中，命令遇到错误将不会停止，且不可以使用 `&&` 符号来运行多条连续的命令。

In `co`, this situation is automatically handled for compatibility. If you execute the above script unchanged in `co` under Windows, it will work normally. It will actually be converted into the following command for execution:

而在 `co` 中，自动对这种情况做了兼容处理。如果你在 Windows 下的 `co` 中，原封不动地执行上面的脚本，那么将正常工作。它实际上会被转换成下面的命令来执行：

```sh
$ErrorActionPreference = "Stop" ; cd ~ ; cd .ssh ; cat id_rsa.pub
```

### Mixins

You can load other `toml` files through `mixins`. `mixins` commands are always written in a group named `general`.

你可以通过 `mixins` 来载入其他的 `toml` 文件，`mixins` 命令固定写在名为 `general` 的组中。

Among them, `mixin` can be a relative path, a path based on the `home` directory, or an absolute path.

其中，`mixin` 可以是一个相对路径，或是一个基于 `home` 目录的路径，也可以是一个绝对路径。

```toml
["general"]
mixins = ["./foo.toml", "~/.co.toml", "/foo/bar/baz.toml"]

["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo hello world",
]
```

### Config presets

Configuration presets are some configurations officially provided by `co`, which can simplify the way you use many commands. Currently, we provide presets for various package managers for JavaScript.

配置预设是 `co` 官方提供的一些配置，它能够简化你使用许多命令的方式。目前，我们为了 JavaScript 的各种包管理器提供了预设。

`mixins` can also load config presets. Confign presets are embedded in the `co` binary file and start with `co:` when used.

`mixins` 还可以加载配置预设，配置预设被嵌入在了 `co` 的二进制文件中，使用时以 `co:` 开头。

All config presets currently available are:

目前的配置预设有：

- `npm`, `yarn`, `pnpm`, `bun`

For example, I use `yarn` in the project, but I am too lazy to remember the `yarn` command. I can provide the `yarn` config preset provided by `co` by introducing:

例如，我在项目中使用 `yarn`，但我懒得记住 `yarn` 的命令，我可以通过引入 `co` 提供的 `yarn` 配置预设：

```toml
["general"]
mixins = ["co:yarn"]
```

Now, I can install `lodash` by simply entering `co i lodash`.

现在，我只要输入 `co i lodash`，就可以安装 `lodash` 了。
