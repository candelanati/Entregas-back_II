import { Router } from "express"
import passport from "passport"

const sessionsRouter = Router()

sessionsRouter.get(
  "/current",
  passport.authenticate("current", { session: false }),
  (req, res) => {
    res.status(200).json({
      message: "Usuario autenticado",
      user: {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        avatar: req.user.avatar,
      }
    })
  }
)

export default sessionsRouter
