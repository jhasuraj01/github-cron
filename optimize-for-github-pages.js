const fs = require("fs")
const path = require("path")

const currPath = "./out"
const newPath = "./docs"

try {
    fs.rmdirSync(newPath, { recursive: true });
} catch (error) {

}

try {
    fs.renameSync(currPath, newPath)
} catch (error) {
    console.log(error)
}

// GitHub Pages return 404 for file/folder names starting with underscore.
const underScoreCorrectionRegex = /_(?=(next|app|index|error))/g;

const machao = async (parent) => {
    // Our starting point
    try {
        // Get the files as an array
        const files = await fs.promises.readdir(parent);

        // Loop them all with the new for...of
        for (const file of files) {
            // Get the full paths
            const fullpath = path.join(parent, file);
            const stat = await fs.promises.stat(fullpath);

            if (stat.isFile()) {
                let file = await fs.promises.readFile(fullpath, "utf-8")
                file = file.replace(underScoreCorrectionRegex, "")
                await fs.promises.writeFile(fullpath, file)
            }
            else if (stat.isDirectory()) {
                await machao(fullpath)
            }
            await fs.promises.rename(fullpath, path.join(parent, file.replace(underScoreCorrectionRegex, "")))
        }
    }
    catch (e) {
        console.error("We've thrown! Whoops!", e);
    }

}

machao(path.join(__dirname, newPath))