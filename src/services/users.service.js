import { usersRepository } from "../repositories/users.repository.js"
const updateByIdServices = async(uid,updatedUser) => await usersRepository.updateById(uid, updatedUser)
const readByIdServices = async(uid)=> await usersManager.readById(uid)
const readByServices = async(filter) => await usersManager.readBy(filter)
export{updateByIdServices, readByIdServices, readByServices}