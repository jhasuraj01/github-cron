const fs = require("fs")
const path = require("path")

const currPath = "./out"
const newPath = "./docs"
const _next = "_next"
const next = "next"

try {
    fs.rmdirSync(newPath, { recursive: true });
} catch (error) {

}

try {
    fs.renameSync(currPath, newPath)
} catch (error) {
    console.log(error)
}

try {
    fs.renameSync(`${newPath}/_next`, `${newPath}/next`)
} catch (error) {
    console.log(error)
}

// try {
//     let html = fs.readFileSync(`${newPath}/index.html`, "utf-8")
//     html = html.replace(/_next/g, "next")
//     fs.writeFileSync(`${newPath}/index.html`, html)
// } catch (error) {
//     console.log(error)
// }


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
                file = file.replace(/_next/g, "next")
                await fs.promises.writeFile(fullpath, file)
            }
            else if (stat.isDirectory()) {
                await machao(fullpath)
            }
        }
    }
    catch (e) {
        console.error("We've thrown! Whoops!", e);
    }

}

machao(path.join(__dirname, newPath))