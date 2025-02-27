import { z } from 'zod';

export const claimsSchema = z.object({
    claimId: z.string(),
    subscriberId: z.string(),
    memberSequence: z.number(),
    claimStatus: z.enum(['Payable', 'Denied', 'Partial Deny']),
    billed: z.number(),
    allowed: z.number(),
    paid: z.number(),
    paymentStatusDate: z.string(),
    serviceDate: z.string(),
    receivedDate: z.string(),
    entryDate: z.string(),
    processedDate: z.string(),
    paidDate: z.string(),
    paymentStatus: z.enum(['Paid']),
    groupName: z.string(),
    groupId: z.string(),
    divisionName: z.enum(['North', 'South', 'East', 'West']),
    divisionId: z.enum(['N', 'S', 'E', 'W']),
    plan: z.string(),
    planId: z.string(),
    placeOfService: z.enum(['Outpatient Hospital', 'Emergency Room - Hospital', 'Inpatient Hospital']),
    claimType: z.enum(['Professional', 'Institutional']),
    procedureCode: z.string(),
    memberGender: z.enum(['Male', 'Female']),
    providerId: z.string(),
    providerName: z.string(),
});

export type ClaimsData = z.infer<typeof claimsSchema>;

