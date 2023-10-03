# 模板内置方法

在模板语法中，可以调用一些内置的方法，这些方法可以帮助我们更方便的编写脚本。

例如，可以轻松实现一个由用户自行选择的功能，效果如下：

```sh
😸 Command running on /root/workspace/co

? What fruits do you like? …
▸ Apple
  Banana
  Cherry
  Grape

```

## loadNodeModuleBin

Alias: `loadNodeModuleBin`, `lnb`

执行 node_modules 中的本地包命令

编写 JavaScript 时，我们有时会安装一些带有命令的包，但我们有时又不想安装到全局。

`typescript` 包自带了名为 `tsc` 的命令，想调用这些局部的命令很简单。

例如，下面我们编写一个查找 `tsc` 命令所在路径的功能：

```toml
["where is tsc"]
commands = ["where-is-tsc", "wt"]
scripts = [
    "echo tsc in: <%= lnb('typescript', 'tsc') %>",
    # or
    # "echo tsc in: <%= loadNodeModuleBin('typescript', 'tsc') %>",
]
```

## interactive

Alias: `interactive`, `ui`, `ia`

交互式接受用户输入

可以实现单选、多选、Y/N 等丰富的交互式功能，基于 [enquirer](https://github.com/enquirer/enquirer#built-in-prompts)，可以查看文档来了解更多。

下面是一些常用的 Demo。

### select

![](https://raw.githubusercontent.com/enquirer/enquirer/master/media/select-prompt.gif)

```toml
["interactive"]
commands = ["ui"]
scripts = [
    '''
    echo '<%= JSON.stringify(
            await ui({
            type: "select",
            message: "What fruits do you like?",
            choices: ["Apple", "Banana", "Cherry", "Grape"],
        })
    ) %>'
    '''
]
```

### confirm

![](https://raw.githubusercontent.com/enquirer/enquirer/master/media/confirm-prompt.gif)

```toml
["interactive"]
commands = ["ui"]
scripts = [
    '''
    echo '<%= JSON.stringify(
        await ui({
            type: "confirm",
            message: "This operation is irreversible, are you sure you want to execute it?",
        })
    ) %>'
    '''
]
```

### input

![](https://raw.githubusercontent.com/enquirer/enquirer/master/media/input-prompt.gif)

```toml
["interactive"]
commands = ["ui"]
scripts = [
    '''
    echo '<%= JSON.stringify(
        await ui({
            type: "input",
            message: 'What is your username?',
            initial: 'jonschlinkert'
        })
    ) %>'
    '''
]
```

### form

![](https://raw.githubusercontent.com/enquirer/enquirer/master/media/form-prompt.gif)

```toml
["interactive"]
commands = ["ui"]
scripts = [
    '''
    echo '<%= JSON.stringify(
        await ui({
            type: "form",
            message: 'Please provide the following information:',
            choices: [
                { name: 'firstname', message: 'First Name', initial: 'Jon' },
                { name: 'lastname', message: 'Last Name', initial: 'Schlinkert' },
                { name: 'username', message: 'GitHub username', initial: 'jonschlinkert' }
            ]
        })
    ) %>'
    '''
]
```
