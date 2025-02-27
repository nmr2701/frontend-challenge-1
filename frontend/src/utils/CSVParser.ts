import Papa from 'papaparse';
import { claimsSchema, ClaimsData} from '../schemas/claimsSchema'; // Adjust the import path as necessary
import { z } from 'zod';


export const parseClaimsCSV = (file: File): Promise<{ data: ClaimsData[]; name: string , errors: string[] }> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const claimsData: ClaimsData[] = [];
                const errors: string[] = [];

                results.data.forEach((row: any) => {
                    try {
                        const validatedData = claimsSchema.parse(row);
                        claimsData.push(validatedData);
                    } catch (error) {
                        if (error instanceof z.ZodError) {
                            errors.push(`Row ${JSON.stringify(row)}: ${error.errors.map(e => e.message).join(', ')}`);
                        }
                    }
                });

                resolve({ data: claimsData, name: file.name, errors });
            },
            error: (error) => {
                reject(`Error parsing CSV: ${error.message}`);
            },
        });
    });
};