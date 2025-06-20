import {productsManager} from "../data/managers/mongo/manager.mongo.js"

const readAllServices = async ()=> await productsManager.readAll()
const readByIdServices = async(pid)=> await productsManager.readById(pid)

export {readAllServices, readByIdServices}