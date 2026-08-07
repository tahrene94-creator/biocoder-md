import { z } from "zod";

// ---------------------------------------------------------------------------
// Every value that enters BioCoder MD from outside -- a pasted VCF, an
// uploaded file, a DOI a reviewer submits -- is untrusted until it passes
// through one of these schemas. This file is the single source of truth for
// those boundaries so client and server code (once the API routes exist)
// validate the same way.
// ---------------------------------------------------------------------------

// Genomic variant classifier: pasted text or an uploaded .vcf/.txt file.
export const MAX_VARIANT_INPUT_BYTES = 256 * 1024; // 256KB is generous for a demo VCF
export const ALLOWED_VARIANT_FILE_TYPES = ["text/plain", "text/vcard", "text/x-vcard", ""]; // browsers report .vcf inconsistently
export const ALLOWED_VARIANT_FILE_EXT = [".vcf", ".txt"];

export const variantInputSchema = z
  .string()
  .min(1, "Provide at least one variant line.")
  .max(MAX_VARIANT_INPUT_BYTES, "Input exceeds the 256KB sandbox limit.")
  // Reject anything that looks like an attempt to break out of a plain-text
  // VCF/HGVS payload -- script tags, template syntax, or SQL-ish tokens have
  // no legitimate place in this field.
  .refine((val) => !/<script|<\/script|\$\{|--\s*$|;\s*(DROP|DELETE|INSERT)\s/i.test(val), {
    message: "Input contains characters that aren't valid in a VCF/HGVS record.",
  });

export function validateUploadedFile(file: File): { ok: true } | { ok: false; reason: string } {
  const name = file.name.toLowerCase();
  const hasAllowedExt = ALLOWED_VARIANT_FILE_EXT.some((ext) => name.endsWith(ext));
  if (!hasAllowedExt) {
    return { ok: false, reason: "Only .vcf or .txt files are accepted." };
  }
  if (file.size > MAX_VARIANT_INPUT_BYTES) {
    return { ok: false, reason: "File exceeds the 256KB sandbox limit." };
  }
  return { ok: true };
}

// /insights paper submission: DOI + reviewer notes.
export const doiSchema = z
  .string()
  .trim()
  .regex(/^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i, "Enter a valid DOI, e.g. 10.1038/s41746-025-01142-x.")
  .max(128);

export const paperSubmissionSchema = z.object({
  doi: doiSchema,
  domain: z.enum(["Genomics", "Precision Oncology", "Medical Imaging", "EHR", "Drug Discovery"]),
  notes: z.string().max(2000).optional(),
});

// Ligand demo: only accept SMILES-shaped strings, never raw HTML/script.
export const smilesSchema = z
  .string()
  .max(400)
  .regex(/^[A-Za-z0-9@+\-\[\]()=#$%.\/\\:*]+$/, "That doesn't look like a valid SMILES string.");
