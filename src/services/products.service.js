import {productsManager, cartsManager} from "../data/managers/mongo/manager.mongo.js"

const readAllServices = async ()=> await productsManager.readAll()
const readByIdServices = async(pid)=> await productsManager.readById(pid)
const readByIdWithPopulateServices = async(cid, populateField)=>{
    return await cartsManager.readByIdWithPopulate(cid, populateField)
}
const createOneServices = async(productoRecibido)=> await productsManager.createOne(productoRecibido)
const updateByIdServices = async(pid,updatedProduct)=>await productsManager.updateById(pid, updatedProduct)
const destroyByIdServices = async(pid)=>await productsManager.destroyById(pid)

export {readAllServices, readByIdServices, readByIdWithPopulateServices, createOneServices, updateByIdServices, destroyByIdServices}