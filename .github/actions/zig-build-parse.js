module.exports = ({ github, context, core }) => {
  const fs = require("fs");

  // Parse `build.zig.zon` for version
  var version;
  var name;
  const raw = fs.readFileSync("./build.zig.zon");
  const lines = raw.toString().split("\n");
  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith(".version")) {
      const parts = line.split("=");
      const version_raw = parts[1];
      const version_cleaned = version_raw
        .replaceAll('"', "")
        .replaceAll(",", "");
      version = version_cleaned.trim();
    }
    if (line.startsWith(".name")) {
      const parts = line.split("=");
      const name_raw = parts[1];
      const name_cleaned = name_raw
        .replaceAll('"', "")
        .replaceAll(",", "");
      name = name_cleaned.trim();
    }
  });

  core.exportVariable('name', name);
  core.exportVariable('version', version);
};
