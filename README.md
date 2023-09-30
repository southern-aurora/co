# co

停止思考项目里到底要用哪个包管理器吧！以及，获得运行命令的更佳方法！

## 为什么使用 co

我经常习惯性地在 `bun` 项目中错误运行 `npm i`，这种肌肉记忆实在是太痛苦了……

为了解决这个问题，我编写了 `co`，你可以通过一套相同的命令来自由地根据不同项目，执行不同的包管理器命令。

实现这样魔法的背后，是 `co` 的命令别名功能，就像 `npm` 中，`package.json` 的 `scripts` 一样，但是更加强大。

对于 `deno` 以及其他的语言来说，他们没有类似命令别名的支持，`co` 也能帮助他们获得一个更强大的命令别名功能。

## 安装

`co` 本质是单个可执行二进制文件，你可以通过 `npm` 来快速安装和你系统相符的版本：

```sh
npm install --global co-linux-x64
npm install --global co-linux-arm64
npm install --global co-macos-x64
npm install --global co-macos-arm64
npm install --global co-win-x64
```

如果你没有 `npm` (对于 `deno` 或其他语言的用户来说)，也可以直接下载二进制文件，然后将其放到你的 `PATH` 中。

https://github.com/akirarika/co/releases

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

然后跟着提示操作即可！在你选择了你所计划在这个工程中所使用的包管理器后，将会为你创建一个 `.co.toml` 文件。

## 命令

如果你想编写自己的命令，我将在后续章节为你阐述！在此之前，我先告诉你，你在刚刚安装操作中，所选用的模板所预置的命令有哪些。

每个操作都有许多别名，这是为了照顾不同包管理器习惯的使用者。例如，我想要安装 `lodash`，那么，以下命令可以随意使用：

```sh
co install lodash
co add lodash
co i lodash
co a lodash
```

在背后，他们会转化为你所使用的包管理器的命令：

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

可以通过阅读别名列表，来了解 `co` 为你提供的命令

## 别名列表

### 运行脚本

别名：`"run", "r"`

对应 npm 命令：`npm run`

### 执行 (npx)

别名：`"execute", "x"`

对应 npm 命令：`npx`

### 安装 (安装依赖)

别名：`"install", "i", "add", "a"`

对应 npm 命令：`npm install`

### 安装一个包

别名：`"install", "i", "add", "a"`

对应 npm 命令：`npm install --save`

### 安装一个包 (至开发环境)

别名：`"install:dev", "i:d", "add:dev", "a:d"`

对应 npm 命令：`npm install --save-dev`

### 安装一个包 (至全局)

别名：`"install:global", "i:g", "add:global", "a:g"`

对应 npm 命令：`npm install --global`

### 更新依赖

别名：`"update", "up", "upgrade"`

对应 npm 命令：`npm upgrade`

### 卸载一个包

别名：`"uninstall", "un", "remove", "rm"`

对应 npm 命令：`npm uninstall`

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
