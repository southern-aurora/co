# 运行网络脚本

你可以通过 `cox` 来运行位于网络上的脚本，体验一下：

```sh
co cox "https://raw.githubusercontent.com/akirarika/co/master/assets/web-script-test.toml"
```

只要你把你的脚本分享到 GitHub 或者其他地方，其他人就可以通过 `co` 来运行它。

## 编写

当脚本运行时，会执行其中的 `cox` 命令，因此，如果你已经写好了一个脚本，那么原脚本无需做任何改动，只要在 `commands` 中添加 `cox` 命令即可。

```toml
["cox"]
commands = ["cox"]
scripts = [
    'echo "hello world!"',
]
```
