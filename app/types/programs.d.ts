import type { Bank } from "./banks";
import type { MortgageDocuments } from "./mortgageDocuments";

export interface Mortgage {
  id: number;
  bank: Bank;
  program_name: string;
  primary_secondary: string;
  no_insurance: boolean;
  income_proof: boolean;
  translations: Array<{
    languages_id: { code: string };
    description_main: string;
    attention_notes: string | null;
  }>;
  rate_min: number;
  rate_max: number;
  gesv_max: number;
  gesv_min: number;
  max_term_months: number;
  min_downpayment: number | null;
  additional_information: string[];
  documents: MortgageDocument[];
  max_loan_amount: number;
  processing_time: number | null;
  mortgage_programs: string[];
  date_created: string;
  date_updated: string;
  pdf_file: string | null;
  website_link: string | null;
  max_property_price: number | null;
}
