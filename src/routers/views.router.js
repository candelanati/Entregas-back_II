import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";
const ViewsRouter = Router()

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
ViewsRouter.get("/",indexView)
ViewsRouter.get("/details/:pid", detailsView)

export default ViewsRouter