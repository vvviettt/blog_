import Router from "express-promise-router";
import authController from "../controllers/authentication.js";

const authRouter = Router();

authRouter.route("/login").post(authController.login);
authRouter.route("/register").post(authController.register);
export default authRouter;
