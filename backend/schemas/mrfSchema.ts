import { z } from 'zod';

// Schema for the MRF output based on the allowed-amounts.json schema which was provided on the given repository
const providerSchema = z.object({
  billed_charge: z.number(),
  npi: z.array(z.number())
});

const paymentSchema = z.object({
  allowed_amount: z.number(),
  billing_code_modifier: z.array(z.string()).optional(),
  providers: z.array(providerSchema)
});

const allowedAmountSchema = z.object({
  tin: z.object({
    type: z.enum(["ein", "npi"]),
    value: z.string()
  }),
  service_code: z.array(z.string()).optional(), // IMPORTANT : required when professional billing class
  billing_class: z.enum(["professional", "institutional"]),
  payments: z.array(paymentSchema)
});

const outOfNetworkSchema = z.object({
  name: z.string(),
  billing_code_type: z.enum([
    "CPT", "HCPCS", "ICD", "MS-DRG", "R-DRG", "S-DRG",
    "APS-DRG", "AP-DRG", "APR-DRG", "APC", "NDC", "HIPPS",
    "LOCAL", "EAPG", "CDT", "RC"
  ]),
  billing_code: z.string(),
  billing_code_type_version: z.string(),
  description: z.string(),
  allowed_amounts: z.array(allowedAmountSchema)
});

const mrfSchema = z.object({
  reporting_entity_name: z.string(),
  reporting_entity_type: z.string(),
  plan_name: z.string().optional(),
  plan_id_type: z.enum(["EIN", "HIOS"]).optional(),
  plan_id: z.string(),
  plan_market_type: z.enum(["group", "individual"]).optional(),
  last_updated_on: z.string(),
  version: z.string(),
  out_of_network: z.array(outOfNetworkSchema)
});

export type MrfType = z.infer<typeof mrfSchema>;