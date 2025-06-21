import mongoose from "mongoose"
import { cartsManager, productsManager } from "../dao/factory.js"
import { readByIdServices, readManyByIdsServices, createOneServices, updateByIdServices, readByIdMongooseServices, destroyByIdServices } from "../services/carts.service.js"

const {isValidObjectId}=mongoose

const readById = async(req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        const {id:cid} = req.params
        let response = await readByIdServices(cid)
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
        let productsExistentes = await readManyByIdsServices(productIds)
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
    
        let response = await createOneServices({ products: productosRecibidosCart })
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
        let carrito = await readByIdServices(cid)
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
        
        let response = await readByIdServices(cid)
        res.status(201).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const updateById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        let {id:cid} = req.params
        let aActualizar=req.body
        if (!aActualizar.products || !Array.isArray(aActualizar.products)) {
            return res.status(400).json({
                error: 'Por favor, envíe un array de productos para actualizar el carrito con id: ' + cid
            });
        }
        for (let element of aActualizar.products) {
            if (!isValidObjectId(element.product)) {
                return res.status(400).json({
                    error: "No existe un producto con id " + element.product + 
                           ". Por favor, ingrese productos con id válidos para actualizar."
                });
            }
            if (typeof element.quantity !== 'number' || element.quantity < 0) {
                return res.status(400).json({
                    error: "La cantidad debe ser un número mayor o igual a 0. " +
                           "Cantidad ingresada: " + element.quantity + 
                           " para el producto con id: " + element.product
                });
            }
        }

        let response = await updateByIdServices(cid,aActualizar)
        res.status(200).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const updateProductById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        let cantidad = req.body
        let {cid,pid}=req.params
        //validacion existencia IDs
        if(!isValidObjectId(cid)){
            return res.status(400).json({error:"Ingrese un ID para carrito válido."})
        }
        if(!isValidObjectId(pid)){
            return res.status(400).json({error:"Ingrese un ID para producto válido."})
        }
        //busca carrito en la base de datos
        let carrito = await readByIdMongooseServices(cid)
        if(!carrito){
            return res.status(400).json({error:"Carrito no encontrado."})
        }
        //buscar el producto en el carrito
        let productoIndex = carrito.products.findIndex(p => p.product.toString() === pid);
        if(productoIndex===-1){
            return res.status(400).json({error:"No existe un producto con id: "+pid+" en el carrito con id: "+cid+". Por favor, ingrese un producto existente."})
        }
        // actualiza quantity
        carrito.products[productoIndex].quantity = cantidad.quantity
        let response = await carrito.save()
        res.status(200).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const destroyById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        const {id:cid} = req.params
        //validacion cid
        if(!isValidObjectId(cid)){
            return res.status(400).send({error:"Id no valido. Por favor, introduzca un id valido para carrito."})
        }
        let cart= await readByIdServices(cid)
        if(!cart){
            return res.status(400).send('El carrito a eliminar con id '+cid+' no existe')
        }
        let response = await destroyByIdServices(cid)
        res.status(200).json({response,method,url})
    } catch (error) {
        next(error)
    }
}
const destroyProductById = async (req,res,next)=>{
    try {
        const { method, originalUrl: url } = req
        const {cid,pid} = req.params
        console.log("id carrito: "+cid+" id producto: "+pid);
        //validacion IDs
        if(!isValidObjectId(cid)){
            return res.status(400).send({error:"Id no valido. Por favor, introduzca un id valido para carrito."})
        }
        if(!isValidObjectId(pid)){
            return res.status(400).send({error:"Id no valido. Por favor, introduzca un id valido para producto."})
        }
        //buscar carrito en la BD
        console.log("Buscando carrito con ID:", cid);
        const carrito = await readByIdMongooseServices(cid)
        console.log("Resultado de búsqueda:", carrito);

        if (!carrito) {
            return res.status(404).send({ error: `No se encontró un carrito con ID ${cid}` });
        }
        //buscar el indice del producto en el carrito
        let productoIndex = carrito.products.findIndex(p => p.product.toString() === pid)
        if(productoIndex===-1){
            return res.status(400).json({error:"No existe un producto con id: "+pid+" en el carrito con id: "+cid+". Por favor, ingrese un producto existente."})
        }
        //elimina el producto
        carrito.products.splice(productoIndex, 1)
        const response = await carrito.save()
        
        res.status(200).json({response,method,url})
    } catch (error) {
        next(error)
    }
}

export {readById, createOne, createOneProduct, updateById, updateProductById, destroyById, destroyProductById}