const fs = require("fs");
const path = require("path");

const fileoderJson = fs.readFileSync(path.join(__dirname, "fileorder.json"), "utf-8");
const fileorder = JSON.parse(fileoderJson);

const generatedScript = fileorder.reduce((totalScript, currentFile) => {
	const currentScript = fs.readFileSync(path.join(__dirname, "scripts", `${currentFile}.sql`), "utf-8");
	return `${totalScript}\n${currentScript}`;
}, "");

fs.writeFileSync(path.join(__dirname, "out.sql"), generatedScript, "utf-8");
