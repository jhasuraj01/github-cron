const fs = require("fs")

const currPath = "./out"
const newPath = "./docs"

fs.renameSync(currPath, newPath)