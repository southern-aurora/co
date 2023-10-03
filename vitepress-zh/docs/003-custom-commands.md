# 自定义命令

你在[安装](/docs/001-install)章节中，成功初始化了 `co`，并获得了一个 `.co.toml` 文件。

在 `.co.toml` 文件中，你可以自定义命令，功能非常强大。

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

## 环境变量

你可以在 `env` 中定义额外的环境变量，这样你就不必考虑在不同系统下设置环境变量的脚本兼容性问题了。

```toml
["say"]
env = { SAY1 = "hello world 1", SAY2 = "hello world 2" }
commands = ["say", "speak", "echo"]
scripts = ["echo $SAY1"]
```

## 多条脚本

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

每条脚本都将会是全新的上下文，例如在上条脚本中设置的变量在下一条会消失、使用 `cd` 命令切换的目录将重置。
