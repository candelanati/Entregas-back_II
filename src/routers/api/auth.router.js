import RouterHelper from "../../helpers/router.helper.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import authController from "../../controllers/auth.controller.js";

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
    this.read("/google",["PUBLIC"],passportCb("google", { scope: ["email", "profile"] }));
    this.read("/google/redirect", ["PUBLIC"], passportCb("google"), authController.loginCb);
    this.read("/bad-auth", ["PUBLIC"], authController.badAuth);
    this.read("/forbidden", ["PUBLIC"], authController.forbidden);
  };
}
const authRouter = new AuthRouter().getRouter();
export default authRouter;
