import { Router } from "express";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import sessionsRouter from "./api/sessions.router.js";
import RouterHelper from "../helpers/router.helper.js";
import cookiesRouter from "./api/cookies.router.js";

// const apiRouter = Router()
class ApiRouter extends RouterHelper {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/products", productsRouter);
    this.use("/carts", cartsRouter);
    this.use("/users", usersRouter);
    this.use("/cookies", cookiesRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/auth", authRouter);
  };
}

// apiRouter.use("/products",productsRouter)
// apiRouter.use("/carts",cartsRouter)
// apiRouter.use("/users",usersRouter)
// apiRouter.use("/auth",authRouter)
// apiRouter.use("/sessions",sessionsRouter)

// export default apiRouter

const apiRouter = new ApiRouter().getRouter();
export default apiRouter