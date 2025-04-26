import { Example } from "tsoa";

export class UnauthorizedErrorResponse {
  @Example("Invalid email or password")
  error!: string;
}
