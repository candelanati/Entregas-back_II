import { cartsManager } from "../dao/factory.js"

class CartsRepository{
    readByIdServices = async(cid)=> await cartsManager.readById(cid)
    readManyByIdsServices = async(productIds)=>await cartsManager.readManyByIds(productIds)
    createOneServices = async(products)=>await cartsManager.createOne(products)
    updateByIdServices = async (cid,updatedProduct)=> await cartsManager.updateById(cid,updatedProduct)
    readByIdMongooseServices = async (cid) => await cartsManager.readByIdMongoose(cid)
    destroyByIdServices = async(cid)=> await cartsManager.destroyById(cid)
}

const cartsRepository = new CartsRepository()
export{cartsRepository}