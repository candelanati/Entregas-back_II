import RouterHelper from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import authController from "../../controllers/auth.controller.js";
import passport from "passport";

class AuthRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", ["PUBLIC"], passportCb("register"), authController.registerCb);
    this.create("/login", ["PUBLIC"], passportCb("login"), authController.loginCb);
    this.create("/signout", ["USER", "ADMIN"], authController.signoutCb);
    this.create("/online", ["USER", "ADMIN"], authController.onlineCb);
    this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read(
      "/google/redirect",
      ["PUBLIC"],
      passport.authenticate("google", {
        failureRedirect: "/api/auth/bad-auth",
        session: false
      }),
      authController.loginCb
    );

    this.read("/bad-auth", ["PUBLIC"], authController.badAuth);
    this.read("/forbidden", ["PUBLIC"], authController.forbidden);
    this.read("/verify/:email/:verifyCode", ["PUBLIC"], authController.verifyUserCb)
    this.create("/reset-password", ["PUBLIC"], authController.resetPasswordCb); // procesa el cambio
    this.create("/resetPassword", ["PUBLIC"], authController.sendResetPasswordEmailCb); // (opcional) envía el mail

  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
