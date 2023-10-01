# co

为你冗长繁杂的脚本们设置一个简单易记的别名！

## co 是怎样诞生的

我是一个 JavaScript 开发者。在 JavaScript 社区中，有许多包管理器，例如 `npm`、`yarn`、`pnpm`、`bun` 等等。

在不同的项目中，安装一个包之前，首先要回忆这个项目所使用的包管理器，然后再运行相应的命令。

由于肌肉记忆，我经常习惯性地在那些 `yarn`、`pnpm`、`bun` 项目中错误运行 `npm i`，这种感觉实在是太痛苦了……

为了解决这个问题，我编写了 `co`，你可以通过一套命令别名，来自由地根据不同项目，执行不同的包管理器命令。

实现这样魔法的背后，是 `co` 的命令别名功能，就像 `npm` 中，`package.json` 的 `scripts` 一样，但是更加强大。

对于 `deno` 以及其他的语言来说，他们没有类似命令别名的支持，`co` 也能帮助他们获得一个更强大的命令别名功能。

## 自动安装

`co` 本质是单个可执行二进制文件，你可以通过 `npm` 来快速安装和你系统相符的版本：

```sh
npm install --global co-win-x64@1.0.0
```

```sh
npm install --global co-linux-x64@1.0.0
```

```sh
npm install --global co-linux-arm64@1.0.0
```

```sh
npm install --global co-macos-x64@1.0.0
```

```sh
npm install --global co-macos-arm64@1.0.0
```

## 手动安装

如果你没有 `npm` (对于 `deno` 或其他语言的用户来说)，可以直接下载二进制文件，然后将其放到你的全局环境变量中。

例如，对于 Linux 用户，你可以通过以下命令来下载和安装 (假设使用 linux-x64 版本)：

```sh
cd /tmp \
&& wget "https://cdn.npmmirror.com/packages/co-linux-x64/1.0.0/co-linux-x64-1.0.0.tgz" \
&& tar -xzf co-linux-x64-1.0.0.tgz \
&& mv /tmp/package/co /usr/bin/co \
&& chmod 777 /usr/bin/co
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

然后跟着提示操作即可！

如果你是 JavaScript 开发者，请选择你计划在这个工程中使用的包管理器。

如果你是其他语言的开发者，请选择 `custom`。

最终，将会为你创建一个 `.co.toml` 文件。

## 命令

稍安勿躁！我先向 JavaScript 开发者们介绍一下，如何使用 `co` 来避免回忆不同包管理器命令的痛苦。如果你是其他语言的开发者，可以直接跳转到[自定义命令](#自定义命令)章节

在上一步的初始化章节中，你选择了你计划在此项目中使用的包管理器，接着，你就可以自由使用下面这些别名了！

例如，你想要安装包 `lodash`，你可以这样做：

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

可以通过阅读下面的别名列表，来了解 `co` 的预设为你提供了哪些别名。

## 别名列表 (JavaScript 包管理器)

### 运行脚本

别名：`run`, `r`

对应 npm 命令：`npm run`

```sh
co r dev
```

### 执行 (npx)

别名：`execute`, `x`

对应 npm 命令：`npx`

```sh
co x prisma
```

### 安装 (安装依赖)

别名：`install`, `i`, `add`, `a`

对应 npm 命令：`npm install`

```sh
co i
```

### 安装一个包

别名：`install`, `i`, `add`, `a`

对应 npm 命令：`npm install --save`

```sh
co i lodash
```

### 安装一个包 (至开发环境)

别名：`install:dev`, `i:d`, `add:dev`, `a:d`

对应 npm 命令：`npm install --save-dev`

```sh
co i:d typescript
```

### 安装一个包 (至全局)

别名：`install:global`, `i:g`, `add:global`, `a:g`

对应 npm 命令：`npm install --global`

```sh
co i:g typescript
```

### 更新依赖

别名：`update`, `up`, `upgrade`

对应 npm 命令：`npm upgrade`

```sh
co up
```

### 卸载一个包

别名：`uninstall`, `un`, `remove`, `rm`

对应 npm 命令：`npm uninstall`

```sh
co rm jquery
```

## 自定义命令

在 `.co.toml` 文件中，你可以自定义命令，功能非常强大。

你可以当作更好用的 `package.json -> scripts` 的替代品。

一个简单的 `Hello World` 命令如下：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo 'hello world'",
]
```

当你输入 `co say` 或 `co speak` 或 `co echo` 时，将会输出：

```sh
hello world
```

### 全局配置

你可能注意到了，为你自动创建的 `.co.toml` 中，包含一个 `~/.co.toml` 的 `mixins`。

是的，这是我们约定俗成的全局配置文件所存放的位置。你可以在你的电脑中的此处定义你的全局命令。

当你在没有初始化过 `co` 的目录中运行命令时，`co` 会自动加载全局配置文件中的命令。

### 多条脚本

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

脚本将按照顺序依次执行，一旦有任一命令执行失败，将会自动终止后续命令的执行。

### 环境变量

你可以在 `env` 中定义额外的环境变量，这样你就不必考虑在不同系统下设置环境变量的脚本兼容性问题了。

```toml
["say"]
env = { SAY1 = "hello world 1", SAY2 = "hello world 2" }
commands = ["say", "speak", "echo"]
scripts = ["echo $SAY1"]
```

### 脚本中插入变量

脚本支持模板语法，可通过 `<%= yourVar %>` 的方式插入变量。

默认的变量有所有的环境变量的值，以及两个特殊变量，`args` 和 `argsArr`：

`args` 是字符串，代表用户所输入的额外参数，如 `co say hello world` 中的 `hello world`。
`argsArr` 是其的数组形式，如 `["hello", "world"]`。

例如，我们可以像下面这样，将用户输入的参数，来输出：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo '<%= args %>'",
]
```

### 脚本中插入表达式

脚本运行在 JavaScript 环境中，因此支持任何 JavaScript 表达式，例如，你可以根据时间不同，来输出上午好或下午好：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo '<%= new Date().getHours() > 12 ? '☀️Good morning!' : '🌖Good afternoon!' %>'",
]
```

### 执行 node_modules 中的本地包命令

编写 JavaScript 时，我们有时会安装一些带有命令的包，但我们有时又不想安装到全局。

例如，`typescript` 包自带了名为 `tsc` 的命令，想调用这些局部的命令很简单。

例如，下面我们编写一个查找 `tsc` 命令所在路径的功能：

```toml
["where is tsc"]
commands = ["where-is-tsc", "wt"]
scripts = [
    "echo tsc in: <%= loadNodeModuleBin('typescript', 'tsc') %>",
]
```

### 脚本中插入 JavaScript

你甚至可以直接在里面编写 JavaScript 代码，实现流程控制。

`<% %>` 之间的代码将会被执行，而 `<%= %>` 之间的代码将会被输出。

(三个连续的引号 `'''` 代表多行字符串，这是 TOML 的语法)

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

### Shell

你可以通过 `shell` 中指定脚本所使用的 `shell`，默认使用 `bash`，在 Windows 下默认使用 `powershell.exe`。

```toml
["ls"]
shell = "sh"
commands = ["ls"]
scripts = ["ls"]
```

### Mixins

你可以通过 `mixins` 来复用你的脚本，`mixins` 命令固定写在名为 `general` 的组中。

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

### 配置预设

`mixins` 还可以加载配置预设，配置预设被嵌入在了 `co` 的二进制文件中，使用时以 `co:` 开头。

目前的配置预设有：

- `npm`, `yarn`, `pnpm`, `bun`

例如，我在项目中使用 `yarn`，但我懒得记住 `yarn` 的命令，我可以通过引入 `co` 提供的 `yarn` 配置预设：

```toml
["general"]
mixins = ["co:yarn"]
```

现在，我只要输入 `co i lodash`，就可以安装 `lodash` 了。
