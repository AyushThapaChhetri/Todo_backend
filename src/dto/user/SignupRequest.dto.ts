import { Example } from "tsoa";

export class SignupRequest {
  @Example("hero")
  fullName!: string;

  @Example("hero@gmail.com")
  emailName!: string;

  @Example("lafsU*sdf9dl")
  emailPassword!: string;

  @Example("lafsU*sdf9dl")
  emailConfirmPassword!: string;

  @Example("male")
  gender!: "male" | "female" | "other";

  @Example("2025-03-05")
  emailDob!: string;
}
