import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { updateUser } from "../../controllers/users.controller.js";

const usersRouter = Router();


usersRouter.put(
  "/",
  passport.authenticate("user", { session: false }),
  updateUser
);

export default usersRouter;
