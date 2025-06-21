import { cartsRepository } from "../repositories/carts.repository.js"

const readByIdServices = async(cid)=> await cartsRepository.readById(cid)
const readManyByIdsServices = async(productIds)=>await cartsRepository.readManyByIds(productIds)
const createOneServices = async(products)=>await cartsRepository.createOne(products)
const updateByIdServices = async (cid,updatedProduct)=> await cartsRepository.updateById(cid,updatedProduct)
const readByIdMongooseServices = async (cid) => await cartsRepository.readByIdMongoose(cid)
const destroyByIdServices = async(cid)=> await cartsRepository.destroyById(cid)
const readByIdWithPopulateServices = async (cid, path) => await cartsRepository.readByIdWithPopulate(cid, path);

export{readByIdServices, readManyByIdsServices, createOneServices, updateByIdServices,readByIdMongooseServices,destroyByIdServices, readByIdWithPopulateServices}