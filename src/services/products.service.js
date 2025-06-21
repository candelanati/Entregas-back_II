import { productsRepository } from "../repositories/products.repository.js"
import { cartsRepository } from "../repositories/carts.repository.js"

const readAllServices = async ()=> await productsRepository.readAll()
const readByIdServices = async(pid)=> await productsRepository.readById(pid)
const readByIdWithPopulateServices = async(cid, populateField)=>{
    return await cartsRepository.readByIdWithPopulate(cid, populateField)
}
const createOneServices = async(productoRecibido)=> await productsRepository.createOne(productoRecibido)
const updateByIdServices = async(pid,updatedProduct)=>await productsRepository.updateById(pid, updatedProduct)
const destroyByIdServices = async(pid)=>await productsRepository.destroyById(pid)

export {readAllServices, readByIdServices, readByIdWithPopulateServices, createOneServices, updateByIdServices, destroyByIdServices}