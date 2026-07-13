import type * as v from "valibot";
import type { contactSchema } from "../schemas/contact";

export type ContactFormData = v.InferOutput<typeof contactSchema>;
