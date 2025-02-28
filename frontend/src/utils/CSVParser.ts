import Papa from 'papaparse';
import { claimsSchema, ClaimsType} from '../schemas/claimsSchema'; // Adjust the import path as necessary
import { z } from 'zod';

export const parseClaimsCSV = (file: File): Promise<{ data: ClaimsType[]; name: string , errors: string[] }> => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                const claimsData: ClaimsType[] = [];
                const errors: string[] = [];

                results.data.forEach((row: any) => {
                    try { 
                        // could map by itterating over the keys of the row object but this would require input to have the same ordering, this allows for different ordering
                        const mappedRow = {
                        claimId: Number(row['Claim ID']),
                        subscriberId: row['Subscriber ID'],
                        memberSequence: Number(row['Member Sequence']),
                        claimStatus: row['Claim Status'],
                        billed: Number(row['Billed']),
                        allowed: Number(row['Allowed']),
                        paid: Number(row['Paid']),
                        paymentStatusDate: new Date(row['Payment Status Date']),
                        serviceDate: new Date(row['Service Date']),
                        receivedDate: new Date(row['Received Date']),
                        entryDate: new Date(row['Entry Date']),
                        processedDate: new Date(row['Processed Date']),
                        paidDate: new Date(row['Paid Date']),
                        paymentStatus: row['Payment Status'],
                        groupName: row['Group Name'],
                        groupId: row['Group ID'],
                        divisionName: row['Division Name'],
                        divisionId: row['Division ID'],
                        plan: row['Plan'],
                        planId: row['Plan ID'],
                        placeOfService: row['Place of Service'],
                        claimType: row['Claim Type'],
                        procedureCode: row['Procedure Code'],
                        memberGender: row['Member Gender'],
                        providerId: row['Provider ID'],
                        providerName: row['Provider Name'],
                    };

                    const validatedData = claimsSchema.parse(mappedRow);
                    claimsData.push(validatedData);
                    } catch (error) {
                        if (error instanceof z.ZodError) {
                            errors.push(`Row ${JSON.stringify(row)}: ${error.errors.map(e => e.message).join(', ')}`);
                            console.error(`Validation error for row: ${JSON.stringify(row)}`, error.errors);
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