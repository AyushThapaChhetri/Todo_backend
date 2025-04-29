// dto/UserResponse.dto.ts
import { Example, Response } from "tsoa";

export class UserResponseData {
  @Example("John Doe")
  fullName!: string;

  @Example("john.doe@example.com")
  email!: string;

  @Example("male")
  gender!: string;

  @Example("1995-06-15T00:00:00.000Z")
  dob!: string;

  @Example("2025-04-25T12:34:56.789Z")
  createdAt!: string;
}

export class SignupResponse {
  @Example(200)
  statusCode!: number;

  @Example("User created successfully")
  message!: string;

  data!: UserResponseData;
}
