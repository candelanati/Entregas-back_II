import {productsManager} from "../dao/factory.js"

class ProductsRepository{
    readAllServices = async ()=> await productsManager.readAll()
    readByIdServices = async(pid)=> await productsManager.readById(pid)
    readByIdWithPopulateServices = async(cid, populateField)=>{
        return await cartsManager.readByIdWithPopulate(cid, populateField)
    }
    createOneServices = async(productoRecibido)=> await productsManager.createOne(productoRecibido)
    updateByIdServices = async(pid,updatedProduct)=>await productsManager.updateById(pid, updatedProduct)
    destroyByIdServices = async(pid)=>await productsManager.destroyById(pid)
}

const productsRepository = new ProductsRepository()

export {productsRepository}