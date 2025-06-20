import {productsManager, cartsManager} from "../data/managers/mongo/manager.mongo.js"

const readAllServices = async ()=> await productsManager.readAll()
const readByIdServices = async(pid)=> await productsManager.readById(pid)
const readByIdWithPopulateServices = async(cid, populateField)=>{
    return await cartsManager.readByIdWithPopulate(cid, populateField)
}

export {readAllServices, readByIdServices, readByIdWithPopulateServices}