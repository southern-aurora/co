import { argv, cwd, exit, platform, stdout } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import Enquirer from "enquirer";
import shelljs from "shelljs";
import C from "ansi-colors";
import toml from "toml";
import template from "ejs";

(async function () {
  const paths = {
    workdir: cwd(),
    config: join(cwd(), ".co.toml"),
  };
  const args = argv.slice(2);

  if (existsSync(paths.config) === false) {
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

  const config = toml.parse(await readFile(paths.config, "utf-8"));

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
    console.log(`${C.bgRedBright(`🍫 Script error `)} The Command not found.`);
    console.log(`➖ Docs: ${C.underline(`https://github.com/akirarika/co`)}`);
    exit(0);
  }

  console.log(`😸 Command running on ${C.underline(paths.workdir)}\n`);

  const scripts = task.scripts as Array<string>;
  const shell = task.shell || (platform === "win32" ? "powershell.exe" : "bash");
  const env = task.env || {};

  const variables = {
    args: args.slice(1).join(" "),
    argsArr: args.slice(1),
  };

  // START: Bun currently has a bug, which may result in the loss of the first line of output for the first self process. This code is meaningless and is only used to avoid this bug
  // try {
  //   await new Promise<number | null>((resolve) => {
  //     const child = shelljs.exec("echo -n ''", {
  //       async: true,
  //       fatal: false,
  //       silent: true,
  //       encoding: "utf8",
  //       shell: platform === "win32" ? "powershell.exe" : "bash",
  //       env: {
  //         ...process.env,
  //         ...env,
  //       },
  //     });

  //     child.stdout!.on("data", (data) => data);
  //     child.stdout!.once("end", () => {
  //       setTimeout(() => resolve(child.exitCode), 64);
  //     });
  //   });
  // } catch (error) {}
  // END: Bun currently has a bug, which may result in the loss of the first line of output for the first self process. This code is meaningless and is only used to avoid this bug

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

    const exitCode = await new Promise<number | null>((resolve) => {
      const child = shelljs.exec(script, {
        async: true,
        fatal: false,
        silent: true,
        encoding: "utf8",
        shell: shell,
        env: {
          ...process.env,
          ...env,
        },
      });

      child.stdout!.on("data", (data) => {
        stdout.write(data);
      });
      child.stderr!.on("data", (data) => {
        stdout.write(data);
      });
      child.stdout!.once("end", () => {
        setTimeout(() => resolve(child.exitCode), 64);
      });
    });
    if (exitCode !== 0) {
      console.log(`${C.bgRedBright(`🍫 Script error `)} exited with code ${exitCode}.`);
      exit(exitCode || 1);
    }
    console.log("");
    //   console.log(child);
  }
})();
