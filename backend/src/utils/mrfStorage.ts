import fs from 'fs';
import path from 'path';
import type { MrfType } from '../schemas/mrfSchema.js';



export function storeMrfFiles(mrfData: MrfType[]) {
    // Loop through each item in mrfData and store by plan_id and last_updated_on

    const __dirname = path.dirname(new URL(import.meta.url).pathname);
    const mrfFilesDir = path.join(__dirname, '../mrfFiles');

    // Create the directory if it doesn't exist
    fs.mkdirSync(mrfFilesDir, { recursive: true });

    
    for (const mrf of mrfData) {
        const lastUpdatedOn = mrf.last_updated_on; 
        const planId = mrf.plan_id; 
        const formattedFileName = `${planId}_${lastUpdatedOn}.json`; 

        const filePath = path.join(__dirname, '../mrfFiles', formattedFileName);
        console.log(`Creating MRF file at ${filePath}`);

        fs.writeFileSync(filePath, JSON.stringify(mrf, null, 2));

        console.log(`MRF file created at ${filePath}`);

    }
}
