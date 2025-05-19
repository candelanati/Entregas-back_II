import { Router } from "express";
import { cartsManager, productsManager } from "../data/managers/mongo/manager.mongo.js";
const ViewsRouter = Router()
import mongoose from "mongoose";
import passport from "passport";

const {isValidObjectId}=mongoose

const indexView = async(req,res)=>{
    try {
        const products = await productsManager.readAll()
        // También pasamos el carrito por defecto (su ID) para usarlo en botones de "Agregar al carrito"
        const defaultCartId = "682a32031b48dcb6e96c3014";
        res.status(200).render("index",{products,defaultCartId})
    } catch (error) {
        res.status(error.statusCode||500).render("error",{error})
    }
}
const detailsView = async (req, res) => {
    const { pid } = req.params
    const product = await productsManager.readById(pid)
    // También pasamos el carrito por defecto (su ID) para usarlo en botones de "Agregar al carrito"
    const defaultCartId = "682a32031b48dcb6e96c3014";
    res.status(200).render("details", { product, defaultCartId })
}
const cartView = async(req,res)=>{
    const { cid } = req.params
    
    if (!isValidObjectId(cid)) {
        return res.status(400).send('ID de carrito inválido')
    }
    const cart = await cartsManager.readByIdWithPopulate(cid,'products.product')
    if (!cart) {
        return res.status(404).send("Carrito no encontrado")
    }
    

    // También pasamos el carrito por defecto (su ID) para usarlo en botones de "Agregar al carrito"
    const defaultCartId = "682a32031b48dcb6e96c3014";

    res.status(200).render("cart", {
        cart,
        defaultCartId
    });
}
const loginView = async (req, res) => {
  res.status(200).render("login");
};
const registerView = async (req, res) => {
  res.status(200).render("register");
};

const profileView = async (req, res) => {
    const { user } = req;
    if (!user.avatar || user.avatar === null || user.avatar === undefined || user.avatar.trim() === "") {
        user.avatar = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
    }
    res.status(200).render("profile", { user });
};

ViewsRouter.get("/",indexView)
ViewsRouter.get("/details/:pid", detailsView)
ViewsRouter.get("/carts/:cid",cartView)
ViewsRouter.get("/login",loginView)
ViewsRouter.get("/register", registerView)
ViewsRouter.get("/profile",passport.authenticate("user", { session: false }),profileView);


export default ViewsRouter