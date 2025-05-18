import { Router } from "express";
import { cartsManager, productsManager } from "../../data/managers/mongo/manager.mongo.js";
import mongoose from "mongoose"

const {isValidObjectId}=mongoose
const cartsRouter = Router()

const readById = async(req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        const {id:cid} = req.params
        let response = await cartsManager.readById(cid)
        //validacion
        if(!response){
            return res.status(404).send({error:'no existen carritos con id: '+cid})
        }
        res.status(200).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const createOne = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        let {products}=req.body
        //caso en el que no se envie nada por body
        if(!Array.isArray(products)||products.length===0){
            products=[]
        }
        // console.log(products)
        let productosRecibidosCart=products
        //busca los IDs de los productos recibidos y valida que sean productos existentes
        let productIds = products.map(product => product.product.toString()) 
        if (productIds.some(id => !mongoose.Types.ObjectId.isValid(id))) {
            return res.status(400).json({ error: "Uno o más IDs de productos no son válidos. Por favor ingrese productos con IDs válidos y vuelva a intentarlo." })
        }
        //busca las cantidades y se fija que sean mayores a 0
        let productQuantities = products.map(product => product.quantity) 
        if (productQuantities.some(cantidad => cantidad<=0)) {
            return res.status(400).json({ error: "Una o más cantidades de productos no son mayores a 0. Por favor ingrese productos con cantidades válidas y vuelva a intentarlo." })
        }
        //busca los productos en la BD
        let productsExistentes = await productsManager.readManyByIds(productIds)
        // console.log('\n productos recibidos:')
        // console.log(productosRecibidosCart)
        // console.log('\n productos existentes:')
        // console.log(productsExistentes)

        //valida existencias
        let productoNoExistente = productosRecibidosCart.find(recibido => {
            return !productsExistentes.some(existente => 
                existente._id.toString() == recibido.product 
            )
        })
        if (productoNoExistente) {
            return res.status(404).send({
                error: `El producto con id: ${productoNoExistente._id} no existe en la lista de productos existentes o no coincide con sus datos`
            })
        }
    
        let response = await cartsManager.createOne({ products: productosRecibidosCart })
        res.status(201).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const createOneProduct = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        let {cid,pid}=req.params
        //valida ids
        if (!mongoose.Types.ObjectId.isValid(cid) ) {
            return res.status(400).json({ error: "ID de cart inválido. Por favor ingrese un id de carrito valido." })
        }
        if(!mongoose.Types.ObjectId.isValid(pid)){
            return res.status(400).json({ error: "ID de producto inválido. Por favor ingrese un id de producto valido." })
        }

        //busca cid
        let carrito = await cartsManager.readById(cid)
        if(!carrito){
            return res.status(404).send("carrito con id " +cid+" no encontrado")
        }
        
        //busca si existe
        let productIndex = carrito.products.findIndex(p => p.product.toString() === pid);

        if (productIndex === -1) {
            // si no existe se agrega
            await cartsManager.updateById(cid, {
                $push: { products: { product: pid, quantity: 1 }}
            })
        }else {
            // si ya existe +1
            await cartsManager.updateOne(
                { _id: cid, "products.product": pid },
                { $inc: { "products.$.quantity": 1 } }
            )
        }
        
        let response = await cartsManager.readById(cid)
        res.status(201).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const updateById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req

    } catch (error) {
        next(error)
    }
}
const updateProductById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req

    } catch (error) {
        next(error)
    }
}
const destroyById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req

    } catch (error) {
        next(error)
    }
}
const destroyProductById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req

    } catch (error) {
        next(error)
    }
}

cartsRouter.get("/:id",readById)
cartsRouter.post("/",createOne)
cartsRouter.post("/:cid/product/:pid",createOneProduct)
cartsRouter.put("/:id",updateById)
cartsRouter.put("/:cid/products/:pid",updateProductById)
cartsRouter.delete("/:id",destroyById)
cartsRouter.delete("/:cid/products/:pid",destroyProductById)


export default cartsRouter