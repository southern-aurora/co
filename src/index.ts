import { argv, cwd, exit, platform, stdout } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import child_process from "node:child_process";
import { join, resolve } from "node:path";
import Enquirer from "enquirer";
import C from "ansi-colors";
import toml from "toml";
import template from "ejs";

(async function () {
  if (existsSync(join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`)) === false) {
    await writeFile(join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`), "# your global config here\n");
  }

  const paths = {
    workdir: cwd(),
    config: join(cwd(), ".co.toml"),
  };
  const args = argv.slice(2);

  if (existsSync(paths.config) === false && args.length === 0) {
    console.clear();
    console.log(`🍫 Hi! It looks like you are using ${C.bgYellowBright("co")} here for the first time!😇 (".co.toml" does not exist)`);
    console.log(`➖ Path: ${C.underline(paths.workdir)}`);
    console.log();

    let stage1: { data: boolean };
    try {
      stage1 = await Enquirer.prompt([
        {
          type: "confirm",
          name: "data",
          message: "Do you want to use co here?",
        },
      ]);
    } catch (error) {
      console.log(`😸 Bye!`);
      exit(0);
    }

    if (stage1.data === false) {
      console.log(`😸 Bye!`);
      exit(0);
    }

    console.clear();

    let stage2: { data: string };
    try {
      stage2 = await Enquirer.prompt([
        {
          type: "select",
          name: "data",
          message: "What config do you want to use as the default for this?",
          choices: ["<cancel>", "custom", "bun", "pnpm", "yarn", "npm"],
        },
      ]);
    } catch (error) {
      console.log(`😸 Bye!`);
      exit(0);
    }

    if (stage2.data === "<cancel>") {
      console.log(`😸 Bye!`);
      exit(0);
    }

    console.clear();

    if (stage2.data === "custom") {
    }

    const config = await readFile(join(__dirname, "templates", `${stage2.data}.toml`), "utf-8");

    //

    await writeFile(paths.config, config);

    console.log(`😸 Now, you can use ${C.bgYellowBright("co")} in here!\n`);
    console.log(`➖ Docs: ${C.underline(`https://github.com/akirarika/co`)}`);
    console.log(`➖ Config: ${C.underline(paths.config)}`);
    console.log(``);
    exit(0);
  }

  if (existsSync(paths.config) === false && args.length > 0) {
    paths.config = join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`);
  }

  let config = toml.parse(await readFile(paths.config, "utf-8"));
  if (config.general) {
    if (config.general.mixins && config.general.mixins.length > 0) {
      for (const mixin of config.general.mixins) {
        if (!mixin) continue;
        if (mixin.startsWith("co:")) {
          const tobeMixinConfig = toml.parse(await readFile(join(__dirname, "internals", `${mixin.substr(3)}.toml`), "utf-8"));
          config = {
            ...tobeMixinConfig,
            ...config,
          };
        } else {
          let mx = mixin;
          if (mx.startsWith("./") || mx.startsWith(".\\")) {
            mx = join(paths.workdir, mx.substr(2));
          } else if (mx.startsWith("~/") || mx.startsWith("~\\")) {
            mx = join(process.env.HOME || process.env.USERPROFILE!, mx.substr(2));
          } else if (mx.startsWith("/")) {
            mx = resolve(mx);
          } else {
            console.log(
              `${C.bgRedBright(`🍫 General error `)} The "${mixin}" is not a valid path, must start with './' or '~/' or '/' or 'co:'`
            );
            exit(1);
          }
          if (existsSync(mx)) {
            const tobeMixinConfig = toml.parse(await readFile(mx, "utf-8"));
            if (tobeMixinConfig.general) {
              console.log(
                `${C.bgRedBright(`🍫 General error `)} ["general"] can only be written in ".co.toml", but it was discovered in "${mixin}".`
              );
              exit(1);
            }
            config = {
              ...tobeMixinConfig,
              ...config,
            };
          }
        }
      }
    }
  }

  if (args.length === 0) {
    args.push("default");
  }

  let task = undefined;
  for (const key in config) {
    const item = config[key];
    if (Array.isArray(item.commands) === false) continue;
    const commands = item.commands as Array<string>;
    if (item.commands.length === 0) continue;
    let hit = false;
    for (const command of commands) {
      if (args[0] === command) {
        hit = true;
        break;
      }
    }
    if (hit === false) continue;

    if (item.scripts === undefined) continue;
    if (Array.isArray(item.scripts) === false) continue;
    if (item.scripts.length === 0) continue;

    task = item;
    break;
  }

  if (task === undefined) {
    console.log(`${C.bgRedBright(`🍫 Command error `)} The Command not found.`);
    console.log(`➖ Docs: ${C.underline(`https://github.com/akirarika/co`)}`);
    console.log(`➖ Config: ${C.underline(paths.config)}`);
    exit(0);
  }

  console.log(`😸 Command running on ${C.underline(paths.workdir)}\n`);

  const scripts = task.scripts as Array<string>;
  const env = task.env || {};

  const variables = {
    args: args.slice(1).join(" "),
    argsArr: args.slice(1),
    loadNodeModuleBin: (pkg: string, cmd: string) => {
      const modulesPath = join(paths.workdir, "node_modules", pkg);
      if (existsSync(modulesPath) === false) {
        console.log(`${C.bgRedBright(`🍫 Script error `)} "${pkg}" is not installed in the local node_modules.`);
        exit(1);
      }
      const packageJson = JSON.parse(readFileSync(join(modulesPath, "package.json"), "utf-8"));
      if (packageJson.bin[cmd]) {
        return join(modulesPath, packageJson.bin[cmd]);
      }

      console.log(
        `${C.bgRedBright(
          `🍫 Script error `
        )} "${cmd}" does not exist in module "${pkg}". Attempt to check the "${cmd}" of package. json in "${pkg}", does it really exist?`
      );
      exit(1);
    },
  };

  for (const rawscript of scripts) {
    let script: string;

    try {
      script = template.render(rawscript, {
        ...process.env,
        ...env,
        ...variables,
      });
    } catch (error: any) {
      console.log(
        `${C.bgRedBright(`🍫 Script error `)} Script parsing errors, usually due to using incorrect syntax or non-existent variables.\n`
      );
      console.log((error?.message || "").split("\n").slice(1).join("\n"));
      exit(1);
    }
    console.log(`${C.bgBlackBright(`🍫 Run script `)} ${C.whiteBright(script)}`);

    try {
      if (platform !== "win32") {
        child_process.execFileSync("bash", ["-c", script], { stdio: "inherit" });
      } else {
        child_process.execFileSync("powershell.exe", ["-Command", script], { stdio: "inherit" });
      }
    } catch (error: any) {
      console.log(`${C.bgRedBright(`🍫 Script error `)} exited with code ${error?.status}.`);
      exit(error?.status);
    }
    console.log("");
  }
})().catch((error) => {
  console.log(`${C.bgRedBright(`🍫 Script error `)} ${error.message}`);
  exit(1);
});
