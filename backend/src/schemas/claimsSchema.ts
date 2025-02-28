import { z } from "zod";

export const claimsSchema = z.object({
    claimId: z.number(),
    subscriberId: z.string(),
    memberSequence: z.number(),
    claimStatus: z.enum(["Payable", "Denied", "Partial Deny"]),
    billed: z.number(),
    allowed: z.number(),
    paid: z.number(),
    paymentStatusDate: z.date(),
    serviceDate: z.date(),
    receivedDate: z.date(),
    entryDate: z.date(),
    processedDate: z.date(),
    paidDate: z.date(),
    paymentStatus: z.enum(["Paid"]),
    groupName: z.string(),
    groupId: z.string(),
    divisionName: z.enum(["North", "South", "East", "West"]),
    divisionId: z.enum(["N", "S", "E", "W"]),
    plan: z.string(),
    planId: z.string(),
    placeOfService: z.string(),
    claimType: z.enum(["Professional", "Institutional"]),
    procedureCode: z.string(),
    memberGender: z.enum(["Male", "Female"]),
    providerId: z.number(),
    providerName: z.string(),
});

export type ClaimsType = z.infer<typeof claimsSchema>;
