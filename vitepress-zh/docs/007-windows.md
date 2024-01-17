# Windows

为了编写的脚本尽可能地可以跨平台，在 Windows 下，对 PowerShell 进行了特殊的兼容处理。

通常，我们希望可以在一条脚本中运行多条命令，且命令在遇到错误时自动停止。因此，我们经常编写这样的脚本：

```sh
cd ~ && cd .ssh && cat id_rsa.pub
```

但在 PowerShell 中，命令遇到错误将不会停止，且不可以使用 `&&` 符号来运行多条连续的命令。

在 `co` 中，自动对这种情况做了兼容处理。如果你在 Windows 下的 `co` 中，原封不动地执行上面的脚本，那么将正常工作。它实际上会被转换成下面的命令来执行：

```sh
$ErrorActionPreference = "Stop"; cd ~; cd .ssh; cat id_rsa.pub;
```

## Platform 模板方法

在 `co` 中，可以使用 `Platform` 模板方法来根据不同平台，返回不同的内容。

```toml
["platform"]
commands = ["plt"]
scripts = [
'''
    echo '
        To delete all your data (VERY DANGEROUS), you can try running:
        rm <%= plt('-rf', '-Recurse -Force') %> ./*
    '
'''
]
```
