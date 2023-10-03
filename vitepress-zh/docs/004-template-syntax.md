# 模板语法

脚本中可以使用模板语法，模板语法是被 `<% %>` 所包裹的内容，这部分内容可以插入合法的 JavaScript (NodeJs) 脚本，将会被执行。

如果添加等号，内容将会被输出，例如 `<%= 1 + 1 %>` 将会输出 `2`。

## 脚本中插入变量

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

## 脚本中插入表达式

脚本运行在 JavaScript (NodeJs) 环境中，因此支持任何 JavaScript 表达式，例如，你可以根据时间不同，来输出上午好或下午好：

```toml
["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo '<%= new Date().getHours() > 12 ? '☀️Good morning!' : '🌖Good afternoon!' %>'",
]
```

## 脚本中插入 JavaScript

你甚至可以直接在里面编写 JavaScript 代码，实现流程控制。

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

注意，以上代码示例中，使用了三个连续的引号 `'''` 代表多行字符串，这是 TOML 的语法。

`co` 会自动删掉**所有的换行**，并删除每行前面的空格。你在编写脚本时，不需要担心换行符和空格的影响，可以自由换行。

## 该使用模板语法吗？

在 `co` 中引入模板语法，是为了尽可能地让配置可以兼容多个平台。如果你的团队中有些人用 Mac 而有些人用 Windows，这将会是一件很头疼的事情。

同时，也为了提高脚本的表达能力，让你可以在脚本中编写更加复杂的逻辑。编写 JavaScript 代码，比编写 shell 脚本，要简单得多，且可以在不同系统下正常运行。

但是模板语法并不是最好的选择，它没有高亮，也没有代码提示和语法检查，这将会让你在编写较复杂的脚本时，感到很不舒服。

如果你认为所要编写的脚步逻辑复杂到了使用模板语法感到吃力的情况时，请考虑是否使用你熟悉的脚本语言来编写脚本，然后通过 `co` 来执行这个脚本。

## Mixins

你可以通过 `mixins` 来载入其他的 `toml` 文件，`mixins` 命令固定写在名为 `general` 的组中。

其中，`mixin` 可以是一个相对路径，或是一个基于 `home` 目录的路径，也可以是一个绝对路径，或一个网络地址 (`http://` 或 `https://`)。

```toml
["general"]
mixins = ["./foo.toml", "~/.co.toml", "/foo/bar/baz.toml"]

["say"]
commands = ["say", "speak", "echo"]
scripts = [
    "echo hello world",
]
```

## Config presets

配置预设是 `co` 官方提供的一些配置，它能够简化你使用许多命令的方式。目前，我们为了 JavaScript 的各种包管理器提供了预设。

`mixins` 还可以加载配置预设，配置预设被嵌入在了 `co` 的二进制文件中，使用时以 `co:` 开头。

目前的配置预设有：

- `npm`, `yarn`, `pnpm`, `bun`

例如，我在项目中使用 `yarn`，但我懒得记住 `yarn` 的命令，我可以通过引入 `co` 提供的 `yarn` 配置预设：

```toml
["general"]
mixins = ["co:yarn"]
```

现在，我只要输入 `co i lodash`，就可以安装 `lodash` 了。
