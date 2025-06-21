import { Router } from "express"
import { createCb, readCb, destroyCb, currentCb } from "../../controllers/sessions.controller.js"
import  passportCb  from "../../middlewares/passportCb.mid.js"

const sessionsRouter = Router()

sessionsRouter.get("/create", createCb)
sessionsRouter.get("/read", readCb)
sessionsRouter.get("/destroy", destroyCb)
// current para passport
sessionsRouter.get("/current", passportCb("current"), currentCb)

export default sessionsRouter
