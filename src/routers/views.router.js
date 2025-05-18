import { Router } from "express";
import { productsManager } from "../data/managers/mongo/manager.mongo.js";
const ViewsRouter = Router()

const indexView = async(req,res)=>{
    try {
        const products = await productsManager.readAll()
        
        res.status(200).render("index",{products})
    } catch (error) {
        res.status(error.statusCode||500).render("error",{error})
    }
}
const detailsView = async (req, res) => {
  const { pid } = req.params
  const product = await productsManager.readById(pid)
  res.status(200).render("details", { product })
}
ViewsRouter.get("/",indexView)
ViewsRouter.get("/details/:pid", detailsView)

export default ViewsRouter