import { Router } from "express";
// const ViewsRouter = Router()
import {indexView, registerView, loginView, detailsView, profileView, updateUserView, cartView} from "../controllers/views.controller.js"
import passport from "passport";
import RouterHelper from "../helpers/router.helper.js"

class ViewsRouter extends RouterHelper {
  constructor(){
    super()
    this.init()
  }
  init = ()=>{
    this.render("/",["PUBLIC"],indexView)
    this.render("/details/:pid", ["PUBLIC"], detailsView)
    this.render("/carts/:cid", ["USER", "ADMIN"],passport.authenticate("user", { session: false, failureRedirect:"/error?message=Acceso%20denegado.%20Por%20favor%20inicia%20sesión." }),cartView)
    this.render("/login", ["PUBLIC"],loginView)
    this.render("/register", ["PUBLIC"], registerView)
    this.render("/profile",["USER", "ADMIN"],passport.authenticate("user", { session: false, failureRedirect:"/error?message=Acceso%20denegado.%20Por%20favor%20inicia%20sesión." }),profileView);
    this.render("/update-user",["USER", "ADMIN"],updateUserView)
    this.render("/error",["PUBLIC"], (req, res) => {
      const error = {
        message: req.query.message || "Ocurrió un error desconocido"
      };
      res.status(200).render("error", { error });
    });
  }

}


const viewsRouter = new ViewsRouter().getRouter()
export default viewsRouter