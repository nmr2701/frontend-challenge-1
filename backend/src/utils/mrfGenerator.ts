import type { MrfType } from '../schemas/mrfSchema.js';
import { type ClaimsType } from '../schemas/claimsSchema.js';
import { aggregateClaimsByPlan, groupClaimsByTypeAndService, groupByProcedure } from './claimAggregator.js';
import { calculateAverage } from './calcAverage.js';


const placeOfServiceToServiceCode: Record<string, string> = {
    'Outpatient Hospital': '22', 
    'Emergency Room - Hospital': '23', 
    'Inpatient Hospital': '21', 
  };


export function mrfGenerator(claims: ClaimsType[]): MrfType[] {
    const mrfs: MrfType[] = [];

    // Aggregate by plan
    const aggregatedData = aggregateClaimsByPlan(claims);

    // Iterate through each plan to create separate MRF files
    for (const [planId, claims] of Object.entries(aggregatedData)) {
      // Use the first claim to get group and plan names
      const sampleClaim = claims[0];
      
      mrfs.push({
        reporting_entity_name: "Clearest Challenge",
        reporting_entity_type: "Health Insurance Issuer",
        plan_name: sampleClaim.plan,
        plan_id: planId,
        plan_id_type: "HIOS",
        plan_market_type: "group",
        last_updated_on: new Date().toISOString().split('T')[0],
        version: "7",
        out_of_network: generateOutOfNetwork(claims)
      });
    }


    return mrfs;
  }

  function generateOutOfNetwork(claims: ClaimsType[]) {
    // Group claims by procedure code
    const procedureGroups = groupByProcedure(claims);
    const outOfNetworkItems = [];
    const billing_code_type = "CPT" as const;

    for (const [procedureCode, procedureClaims] of Object.entries(procedureGroups)) {
      outOfNetworkItems.push({
        name: "Health Check", 
        billing_code_type:billing_code_type,
        billing_code: procedureCode,
        billing_code_type_version: "2024",
        description: "Medical procedure",
        allowed_amounts: calculateAllowedAmounts(procedureClaims)
      });
    }

    return outOfNetworkItems;
  }


  function calculateAllowedAmounts(claims: ClaimsType[]) {
    // Group by billing class and place of service
    const groupedClaims = groupClaimsByTypeAndService(claims);
    const tinType = "npi" as const;

    return Object.entries(groupedClaims).map(([_, claimsGroup]: [string, ClaimsType[]]) => {
      const totalBilledCharge = claimsGroup.reduce((sum: number, claim: ClaimsType) => sum + claim.billed, 0);
      const npiList = claimsGroup.map((claim: ClaimsType) => claim.providerId); // Collect all NPIs

      return {
        tin: {
          type: tinType,
          value: "1234567890" 
        },
        billing_class: claimsGroup[0].claimType.toLowerCase() as "professional" | "institutional",
        ...(claimsGroup[0].claimType.toLowerCase() === "professional" && {
          service_code: [placeOfServiceToServiceCode[claimsGroup[0].placeOfService]]
        }),
        payments: [{
          allowed_amount: calculateAverage(claimsGroup.map(claim => claim.allowed)),
          providers: [{
            billed_charge: totalBilledCharge, // Sum of all billed charges
            npi: npiList // Array of NPIs
          }]
        }]
      };
    });
  }


