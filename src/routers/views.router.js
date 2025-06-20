import { Router } from "express";
const ViewsRouter = Router()
import {indexView, registerView, loginView, detailsView, profileView, updateUserView, cartView} from "../controllers/views.controller.js"
import passport from "passport";



ViewsRouter.get("/",indexView)
ViewsRouter.get("/details/:pid", detailsView)
ViewsRouter.get("/carts/:cid",passport.authenticate("user", { session: false, failureRedirect:"/error?message=Acceso%20denegado.%20Por%20favor%20inicia%20sesión." }),cartView)
ViewsRouter.get("/login",loginView)
ViewsRouter.get("/register", registerView)
ViewsRouter.get("/profile",passport.authenticate("user", { session: false, failureRedirect:"/error?message=Acceso%20denegado.%20Por%20favor%20inicia%20sesión." }),profileView);
ViewsRouter.get("/update-user",updateUserView)
ViewsRouter.get("/error", (req, res) => {
  const error = {
    message: req.query.message || "Ocurrió un error desconocido"
  };
  res.status(200).render("error", { error });
});


export default ViewsRouter