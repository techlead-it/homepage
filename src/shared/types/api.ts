// Success response from contact API
export interface ContactSuccessResponse {
  success: true;
  messageId: string;
}

// Error responses from contact API
export type ContactErrorResponse =
  | {
      // Single error message (e.g., email sending failed, server error)
      error: string;
    }
  | {
      // Multiple field validation errors
      errors: { [key: string]: string };
    };
