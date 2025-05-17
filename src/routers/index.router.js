import { Router } from "express";
import ViewsRouter from "./views.router.js";
import apiRouter from "./api.router.js";

const indexRouter = Router()

indexRouter.use("/",ViewsRouter)
indexRouter.use("/api",apiRouter)

export default indexRouter