import { productsManager, cartsManager } from "../data/managers/mongo/manager.mongo.js";

const readByIdServices = async(cid)=> await cartsManager.readById(cid)
const readManyByIdsServices = async(productIds)=>await cartsManager.readManyByIds(productIds)
const createOneServices = async(products)=>await cartsManager.createOne(products)
const updateByIdServices = async (cid,updatedProduct)=> await cartsManager.updateById(cid,updatedProduct)
const readByIdMongooseServices = async (cid) => await cartsManager.readByIdMongoose(cid)
const destroyByIdServices = async(cid)=> await cartsManager.destroyById(cid)
export{readByIdServices, readManyByIdsServices, createOneServices, updateByIdServices,readByIdMongooseServices,destroyByIdServices}