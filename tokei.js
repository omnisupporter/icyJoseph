/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const devPath = path.resolve(os.homedir(), "dev");

const args = ["-t", "JavaScript,TypeScript,CSS,Rust", "--output", "json"];

const ls = spawn("tokei", [...args, devPath]);

const chunks = [];

ls.stdout.on("data", (data) => {
  chunks.push(data);
});

ls.stderr.on("data", (data) => {
  console.error(`Something went wrong: ${data}`);
});

ls.on("close", (code) => {
  const parsed = JSON.parse(chunks.join(""));

  const filtered = Object.entries(parsed)
    .filter(([language]) => language !== "Total")
    .map(([language, { reports: _, ...rest }]) => ({ language, ...rest }))
    .map(({ language, ...rest }) =>
      language === "Css" ? { language: "CSS", ...rest } : { language, ...rest }
    )
    .sort((a, b) => b.code - a.code);

  fs.writeFile(
    path.resolve(__dirname, "tokei.json"),
    JSON.stringify(filtered, undefined, 2),
    (err) => {
      if (err) return console.log("Error while writing tokei.json", err);
      console.log(
        `Saved tokei data from ${devPath}. \n Process exited with code ${code}`
      );
    }
  );
});
