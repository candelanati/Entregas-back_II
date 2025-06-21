import {productsManager} from "../dao/factory.js"

class ProductsRepository{
    readAll = async ()=> await productsManager.readAll()
    readById = async(pid)=> await productsManager.readById(pid)
    readByIdWithPopulate = async(cid, populateField)=>{
        return await cartsManager.readByIdWithPopulate(cid, populateField)
    }
    createOne = async(productoRecibido)=> await productsManager.createOne(productoRecibido)
    updateById = async(pid,updatedProduct)=>await productsManager.updateById(pid, updatedProduct)
    destroyById = async(pid)=>await productsManager.destroyById(pid)
}

const productsRepository = new ProductsRepository()

export {productsRepository}