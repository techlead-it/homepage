import * as v from "valibot";
import { contactSchema } from "../schemas/contact";

export type ContactFormData = v.InferOutput<typeof contactSchema>;
