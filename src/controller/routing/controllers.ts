import { authRouter } from "./auth/auth.routes";
import { clientRouter } from "./client/client.routes";
import { userRouter } from "./user/user.routes";

export default [authRouter, clientRouter, userRouter];
