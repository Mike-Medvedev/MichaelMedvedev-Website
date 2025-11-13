import { readdirSync, renameSync } from "node:fs"
import path from "node:path"
import { spawn } from "node:child_process"

function replaceExt(str, ext){
    const newStr = str.replace(/\.[^.]+$/, ext); // file.jpg -> file.webp
    return newStr;
}

function convertImageToWebp(){
    //find all jpg/jpeg/pngs
    const cwd = process.cwd();
    const assetsRelativePath = "client/assets";
    const assetsDir = path.join(cwd, assetsRelativePath);
    const assetContents = readdirSync(assetsDir);
    const filesToConvert = assetContents.filter(file => file.endsWith(".jpg") || file.endsWith(".jpeg") || file.endsWith(".png") || file.endsWith(".webp"));

    for(const file of filesToConvert){
        // -vf to scale images to a width of 800px. -1 for auto height -q:v for compressing image
        const subprocess = spawn("ffmpeg", ["-y", "-i", file, "-vf", "scale=800:-1", "-q:v", "80", "temp" + replaceExt(file, ".webp")], { cwd: assetsDir });
        subprocess.stderr.on(("data"), (data) => console.log(data.toString()));
    }
}

function removeTemp(){
    const cwd = process.cwd();
    const assetRelativePath = "client/assets";
    const fullPath = path.join(cwd, assetRelativePath);

    const contents = readdirSync(fullPath);
    const temppaths = contents.filter(file => file.startsWith("temp"));

    temppaths.forEach(file => {
        const oldPath = path.join(fullPath, file);
        const newPath = path.join(fullPath, file.slice(4));
        renameSync(oldPath, newPath);
    });
}

