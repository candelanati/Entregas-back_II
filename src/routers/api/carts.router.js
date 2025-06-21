
import RouterHelper from "../../helpers/router.helper.js";
import { readById, createOne, createOneProduct, updateById, updateProductById, destroyById, destroyProductById } from "../../controllers/carts.controller.js"

class CartsRouter extends RouterHelper{
    constructor(){
        super()
        this.init()
    }
    init = ()=>{
        this.read("/:id",["USER"],readById)
        this.create("/",["USER"],createOne)
        this.create("/:cid/product/:pid",["USER"],createOneProduct)
        this.update("/:id",["USER"],updateById)
        this.update("/:cid/products/:pid",["USER"],updateProductById)
        this.destroy("/:id",["USER"],destroyById)
        this.destroy("/:cid/products/:pid",["USER"],destroyProductById)
    }
}


const cartsRouter = new CartsRouter().getRouter() 
export default cartsRouter