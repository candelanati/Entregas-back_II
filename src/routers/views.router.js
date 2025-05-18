import { Router } from "express";
import { cartsManager, productsManager } from "../data/managers/mongo/manager.mongo.js";
const ViewsRouter = Router()
import mongoose from "mongoose";

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
    let total = 0
    for (const item of cart.products) {
        const price = item.product?.price || 0
        const quantity = item.quantity || 0
        total += price * quantity
    }

    // También pasamos el carrito por defecto (su ID) para usarlo en botones de "Agregar al carrito"
    const defaultCartId = "682a32031b48dcb6e96c3014";

    res.render("cart", {
        cart,
        defaultCartId,
        total
    });
}

ViewsRouter.get("/",indexView)
ViewsRouter.get("/details/:pid", detailsView)
ViewsRouter.get("/carts/:cid",cartView)

export default ViewsRouter