import fs from "fs";
import path from "path";
import type { MrfType } from "../schemas/mrfSchema.js";

export function getMrfFiles(): MrfType[] {
    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const mrfFilesDir = path.join(__dirname, "../mrfFiles");
    const files = fs.readdirSync(mrfFilesDir);
    const mrfFiles: MrfType[] = [];

    for (const file of files) {
        if (file.endsWith(".json")) {
            const filePath = path.join(mrfFilesDir, file);
            const fileContent = fs.readFileSync(filePath, "utf-8");
            const mrfData: MrfType = JSON.parse(fileContent);
            mrfFiles.push(mrfData);
        }
    }

    return mrfFiles;
}
