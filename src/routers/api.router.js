import { Router } from "express";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";
import usersRouter from "./api/users.router.js";
import authRouter from "./api/auth.router.js";
import sessionsRouter from "./api/sessions.router.js";

const apiRouter = Router()

apiRouter.use("/products",productsRouter)
apiRouter.use("/carts",cartsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/auth",authRouter)
apiRouter.use("/sessions",sessionsRouter)

export default apiRouter