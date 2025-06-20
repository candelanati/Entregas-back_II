import { cartsManager, productsManager } from "../data/managers/mongo/manager.mongo.js";
import mongoose from "mongoose";
import { readAllServices, readByIdServices } from "../services/products.service.js";


const {isValidObjectId}=mongoose

const indexView = async(req,res)=>{
    try {
        const products = await readAllServices()
        // También pasamos el carrito por defecto (su ID) para usarlo en botones de "Agregar al carrito"
        const defaultCartId = "682a32031b48dcb6e96c3014";
        res.status(200).render("index",{products,defaultCartId})
    } catch (error) {
        res.status(error.statusCode||500).render("error",{error})
    }
}
const detailsView = async (req, res) => {
    const { pid } = req.params
    const product = await readByIdServices(pid)
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
const updateUserView = async (req, res) => {
  res.status(200).render("update-user");
};

export {indexView, registerView, loginView, detailsView, profileView, updateUserView, cartView} //export para usar en views router