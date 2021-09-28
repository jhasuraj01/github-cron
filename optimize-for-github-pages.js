const fs = require("fs")
const path = require("path")

const currPath = "./out"
const newPath = "./docs"

try {
    fs.rmdirSync(newPath, { recursive: true });
} catch (error) {
    console.log(error)
}

try {
    fs.renameSync(currPath, newPath)
} catch (error) {
    console.log(error)
}

// GitHub Pages return 404 for file/folder names starting with underscore.
// const underScoreCorrectionRegex = /_(?=(next|app|index|error))/g;

const replacements = []

const findUnderscoreReplacements = async (parent) => {
    // Our starting point
    try {
        // Get the files as an array
        const files = await fs.promises.readdir(parent);

        // Loop them all with the new for...of
        for (const file of files) {
            // Get the full paths
            const fullpath = path.join(parent, file);
            const stat = await fs.promises.stat(fullpath);
            if (stat.isDirectory()) {
                await findUnderscoreReplacements(fullpath)
            }

            if(file.startsWith("_")) {
                replacements.push({
                    find: new RegExp(file, 'g'),
                    replace: file.replace(/^_*(?=(\w))/g, "")
                })
            }
        }
    }
    catch (e) {
        console.error("We've thrown! Whoops!", e);
    }

}

const replaceUnderscores = async (parent) => {
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
                let fileContent = await fs.promises.readFile(fullpath, "utf-8")

                replacements.forEach(re => {
                    fileContent = fileContent.replace(re.find, re.replace)
                })

                await fs.promises.writeFile(fullpath, fileContent)
            }
            else if (stat.isDirectory()) {
                await replaceUnderscores(fullpath)
            }

            let newName = file
            replacements.forEach(re => {
                newName = newName.replace(re.find, re.replace)
            })
            await fs.promises.rename(fullpath, path.join(parent, newName))
        }
    }
    catch (e) {
        console.error("We've thrown! Whoops!", e);
    }

}

(async function() {
    const parent = path.join(__dirname, newPath)

    await findUnderscoreReplacements(parent);
    console.log(replacements)
    await replaceUnderscores(parent);
})()