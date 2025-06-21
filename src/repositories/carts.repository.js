import { cartsManager } from "../dao/factory.js"
import CartsDTO from "../dto/carts.dto.js"

class CartsRepository{
    readById = async(cid)=> await cartsManager.readById(cid)
    readManyByIds = async(productIds)=>await cartsManager.readManyByIds(productIds)
    createOne = async(products)=>await cartsManager.createOne(new CartsDTO(products))
    updateById = async (cid,updatedProduct)=> await cartsManager.updateById(cid,updatedProduct)
    readByIdMongoose = async (cid) => await cartsManager.readByIdMongoose(cid)
    readByIdWithPopulate = async (cid, path) => await cartsManager.readByIdWithPopulate(cid, path);
    destroyById = async(cid)=> await cartsManager.destroyById(cid)
}

const cartsRepository = new CartsRepository()
export{cartsRepository}