# JavaScript 包管理器

稍安勿躁！我先向 JavaScript 开发者们介绍一下，如何使用 `co` 来避免回忆不同包管理器命令的痛苦。如果你是其他语言的开发者，可以直接跳转到[自定义命令](/docs/003-custom-commands)章节

在上一步的初始化章节中，你选择了你计划在此项目中使用的包管理器，接着，你就可以自由使用下面这些命令了！

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

## 别名列表

### 运行脚本

Alias: `run`, `r`

Compare NPM: `npm run`

```sh
co r dev
```

### 执行 (npx)

Alias: `execute`, `x`

Compare NPM: `npx`

```sh
co x prisma
```

### 安装依赖

Alias: `install`, `i`, `add`, `a`

Compare NPM: `npm install`

```sh
co i
```

### 安装一个包

Alias: `install`, `i`, `add`, `a`

Compare NPM: `npm install --save`

```sh
co i lodash
```

### 安装一个包 (至开发环境)

Alias: `install:dev`, `i:d`, `add:dev`, `a:d`

Compare NPM: `npm install --save-dev`

```sh
co i:d typescript
```

### 安装一个包 (至全局)

Alias: `install:global`, `i:g`, `add:global`, `a:g`

Compare NPM: `npm install --global`

```sh
co i:g typescript
```

### 更新依赖

Alias: `update`, `up`, `upgrade`

Compare NPM: `npm upgrade`

```sh
co up
```

### 卸载一个包

Alias: `uninstall`, `un`, `remove`, `rm`

Compare NPM: `npm uninstall`

```sh
co rm jquery
```
