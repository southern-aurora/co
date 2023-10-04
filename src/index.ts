import { argv, cwd, exit, platform, stdout } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import child_process from "node:child_process";
import path, { join, resolve } from "node:path";
import { decode } from "html-entities";
import Enquirer from "enquirer";
import C from "ansi-colors";
import toml from "toml";
import template from "ejs";
import axios from "axios";
import chu from '@poech/camel-hump-under';
import dayjs from "dayjs";

(async function () {
  if (existsSync(join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`)) === false) {
    await writeFile(join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`), "# your global config here\n");
  }
  if (existsSync(join(process.env.HOME || process.env.USERPROFILE!, `.co-temps`)) === false) {
    mkdirSync(join(process.env.HOME || process.env.USERPROFILE!, `.co-temps`));
  }

  const paths = {
    workdir: cwd(),
    config: join(cwd(), ".co.toml"),
    tempdir: join(process.env.HOME || process.env.USERPROFILE!, `.co-temps`),
  };
  const args = argv.slice(2);

  if (args[0] === "cox") {
    if (!args[1]) {
      console.log(
        `${C.bgRedBright(
          `🍫 Command error `
        )} The "co cox" command must have at least 2 parameters, and the second parameter is the network address you want to execute.`
      );
      exit(1);
    }
    const base64ed = Buffer.from(args[1]).toString("base64");
    if (existsSync(join(paths.tempdir, base64ed)) === false) {
      const axiosResult = await axios({
        method: "get",
        url: args[1],
        timeout: 10000,
        responseType: "text",
      });
      await writeFile(join(paths.tempdir, base64ed), axiosResult.data);
    }
    paths.config = join(paths.tempdir, base64ed);
  }

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

  let homeToml = false;
  if (existsSync(paths.config) === false && args.length > 0) {
    paths.config = join(process.env.HOME || process.env.USERPROFILE!, `.co.toml`);
    homeToml = true;
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
        } else if (mixin.startsWith("http://") || mixin.startsWith("https://")) {
          const base64ed = Buffer.from(mixin).toString("base64");
          let data: string;
          if (existsSync(join(paths.tempdir, base64ed)) === false) {
            const axiosResult = await axios({
              method: "get",
              url: mixin,
              timeout: 10000,
              responseType: "text",
            });
            await writeFile(join(paths.tempdir, base64ed), axiosResult.data);
            data = axiosResult.data;
          } else {
            data = await readFile(join(paths.tempdir, base64ed), "utf-8");
          }
          const tobeMixinConfig = toml.parse(data);
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
              `${C.bgRedBright(
                `🍫 General error `
              )} The "${mixin}" is not a valid path, must starts with 'co:' or './' or '~/' or '/' or 'http://' or 'https://'`
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

  console.log(`😸 Command running on ${C.underline(paths.workdir)}\n`);

  const execute = async (args: Array<string>) => {
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
      if (homeToml === true) {
        console.log(
          C.bgYellowBright(`⚠️  NOTE: Is the directory "${C.underline(paths.workdir)}" where you are running the command the directory you want?`)
        );
        console.log(
          `The ".co.toml" does not exist in directory "${C.underline(paths.workdir)}" where the command is currently running, so try using "${paths.config
          }" as the configuration, but this configuration does not exist, or the command you are running still does not exist in it!`
        );
      }
      exit(0);
    }

    const scripts = task.scripts as Array<string>;
    const env = task.env || {};

    const utilsInteractive = async (data: any) => {
      data.name = "data";
      const result: { data: any } = await Enquirer.prompt([data]);
      return result.data;
    };

    const utilsLoadNodeModuleBin = (pkg: string, cmd: string) => {
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
    };

    const utilsPlatform = (bash: string, powershell: string) => {
      if (platform !== "win32") {
        // linux or macos
        return bash;
      } else {
        // windows
        return powershell;
      }
    }

    const utilsCamel = (str: string) => {
      return chu.camel(str);
    }

    const utilsHump = (str: string) => {
      return chu.hump(str);
    }

    const utilsHyphen = (str: string) => {
      return chu.hyphen(str);
    }

    const utilsUnderline = (str: string) => {
      return chu.underline(str);
    }

    const utilsReadJSON = (path: string) => {
      return JSON.parse(readFileSync(path, "utf-8"));
    }

    const utilsReadTOML = (path: string) => {
      return toml.parse(readFileSync(path, "utf-8"));
    }

    const utilsReadENV = (path: string) => {
      function parseEnv(data: string): { [key: string]: string } {
        const envEntries = data.split('\n')
        const envObject: { [key: string]: string } = {}

        for (const entry of envEntries) {
          const [key, value] = entry.split('=')
          if (key && value) {
            envObject[key.trim()] = value.trim()
          }
        }

        return envObject
      }

      return parseEnv(readFileSync(path, "utf-8"));
    }

    const utilsExist = (path: string) => {
      if (path.startsWith("~/") || path.startsWith("~\\")) {
        path = join(process.env.HOME || process.env.USERPROFILE!, path.substring(2));
      }
      else if (path.startsWith("./") || path.startsWith(".\\")) {
        path = join(paths.workdir, path.substring(2));
      }
      return existsSync(join(path));
    }

    const utilsDay = dayjs;


    const variables = {
      args: args.slice(1).join(" "),
      argsArr: args.slice(1),
      ui: utilsInteractive,
      ia: utilsInteractive,
      interactive: utilsInteractive,
      lnb: utilsLoadNodeModuleBin,
      loadNodeModuleBin: utilsLoadNodeModuleBin,
      platform: utilsPlatform,
      plt: utilsPlatform,
      camel: utilsCamel,
      hump: utilsHump,
      hyphen: utilsHyphen,
      underline: utilsUnderline,
      readJSON: utilsReadJSON,
      readTOML: utilsReadTOML,
      exist: utilsExist,
      readENV: utilsReadENV,
      day: utilsDay,
    };

    for (const rawscript of scripts) {
      let script: string;

      try {
        script = await template.render(
          rawscript,
          {
            ...process.env,
            ...env,
            ...variables,
          },
          {
            async: true,
          }
        );

        script = decode(script);

        script = script.replace(/^\s+/gm, "").replace(/\r?\n/g, "").trim();
      } catch (error: any) {
        console.log(
          `${C.bgRedBright(`🍫 Script error `)} Script parsing errors, usually due to using incorrect syntax or non-existent variables.\n`
        );
        console.log((error?.message || "").split("\n").slice(1).join("\n"));
        exit(1);
      }

      if (script.startsWith("goto:")) {
        const cmdstr = script.substring(5);

        const result = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < cmdstr.length; i++) {
          const char = cmdstr[i];

          if (char === ' ' && !inQuotes) {
            if (current) {
              result.push(current);
              current = '';
            }
          } else if (char === '"' || char === "'") {
            if (inQuotes && cmdstr[i - 1] !== '\\') {
              inQuotes = false;
            } else if (!inQuotes) {
              inQuotes = true;
            }
            current += char;
          } else {
            current += char;
          }
        }

        if (current) {
          result.push(current);
        }

        await execute(result);
      } else {
        try {
          if (platform !== "win32") {
            // linux or macos
            console.log(`${C.bgBlackBright(`🍫 Run script `)} ${C.whiteBright(script)}`);
            child_process.execFileSync("bash", ["-c", script], { stdio: "inherit" });
          } else {
            // windows
            script = '$ErrorActionPreference = "Stop";' + script;
            script.replace(/&&/g, ";");
            console.log(`${C.bgBlackBright(`🍫 Run script `)} ${C.whiteBright(script)}`);
            child_process.execFileSync("powershell.exe", ["-Command", script], { stdio: "inherit" });
          }
        } catch (error: any) {
          console.log(`${C.bgRedBright(`🍫 Script error `)} exited with code ${error?.status}.`);
          exit(error?.status);
        }
      }

      console.log("");
    }
  }

  await execute(args);

})().catch((error) => {
  console.log(`${C.bgRedBright(`🍫 Script error `)} ${error.message}`);
  exit(1);
});
