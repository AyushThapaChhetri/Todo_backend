// src/dto/Error/ValidationErrorResponse.dto.ts
import { Example } from "tsoa";

export class FieldError {
  /**
   * Name of the invalid field
   * @example "emailName"
   */
  @Example("emailName")
  field!: string;

  /**
   * Error message for this field
   * @example "Please Enter Email"
   */
  @Example("Please Enter Email")
  message!: string;
}

export class ValidationErrorResponse {
  /**
   * General error message
   * @example "Validation failed"
   */
  @Example("Validation failed")
  message!: string;

  /**
   * Detailed list of field errors
   */
  errors!: FieldError[];
}
