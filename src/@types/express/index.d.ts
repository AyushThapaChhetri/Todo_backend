// import { Request } from "express";
// import { User } from "@prisma/client"; // Adjust this based on your actual User type

// export interface AuthRequest extends Request {
//   user?: User; // Add the `user` property to the request
// }

// import express from "express";
// import { User } from "@prisma/client";

// // Extending an existing module
// declare module "express" {
//   export interface Request {
//     user?: User;
//   }
// }

import { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}
