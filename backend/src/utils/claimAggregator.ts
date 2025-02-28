import { type ClaimsType } from '../schemas/claimsSchema.js';

interface aggregatedData {
  [key: string]: ClaimsType[];
}


// Standalone functios to group claims by different criteria
export function aggregateClaimsByPlan(claims: ClaimsType[]): aggregatedData {
  return claims.reduce((acc, claim) => {
    if (!acc[claim.planId]) {
      acc[claim.planId] = [];
    }
    acc[claim.planId].push(claim);
    return acc;
  }, {} as Record<string, ClaimsType[]>);
}

export function groupClaimsByTypeAndService(claims: ClaimsType[]): aggregatedData {
  return claims.reduce((acc, claim) => {
    const key = `${claim.claimType}_${claim.placeOfService}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(claim);
    return acc;
  }, {} as Record<string, ClaimsType[]>);
}


export function groupByProcedure(claims: ClaimsType[]): aggregatedData {
  return claims.reduce((acc, claim) => {
    if (!acc[claim.procedureCode]) {
      acc[claim.procedureCode] = [];
    }
    acc[claim.procedureCode].push(claim);
    return acc;
  }, {} as Record<string, ClaimsType[]>);
}

