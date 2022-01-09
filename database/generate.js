const fs = require("fs");
const path = require("path");

const fileoderJson = fs.readFileSync(path.join(__dirname, "fileorder.json"), "utf-8");
const fileorder = JSON.parse(fileoderJson);

const subfolder = process.argv[2];
const trimmedFileorder = subfolder ? fileorder.filter((file) => file.split("/")[0] === subfolder) : fileorder;

if (trimmedFileorder.length === 0) {
	throw new Error(`Could not generate a script for version '${subfolder}'`);
}

const generatedScript = trimmedFileorder.reduce((totalScript, currentFile) => {
	const currentScript = fs.readFileSync(path.join(__dirname, "scripts", `${currentFile}.sql`), "utf-8");
	return `${totalScript}\n${currentScript}`;
}, "");

const outputFilename = `out${subfolder ? `_${subfolder}` : ""}.sql`;
fs.writeFileSync(path.join(__dirname, outputFilename), generatedScript, "utf-8");
