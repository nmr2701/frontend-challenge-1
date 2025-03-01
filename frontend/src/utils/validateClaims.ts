import { claimsSchema } from "../schemas/claimsSchema";
import { z } from "zod";

export const validateClaims = (claimsData: any[]): string[] => {
    const errors: string[] = [];

    claimsData.forEach((claim, index) => {
        try {
            claimsSchema.parse(claim);
        } catch (error) {
            if (error instanceof z.ZodError) {
                errors.push(`Error in row ${index + 1}: ${error.errors.map((e) => e.message).join(", ")}`);
            }
        }
    });

    return errors;
};