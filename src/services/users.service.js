import { usersRepository } from "../repositories/users.repository.js"
const updateByIdServices = async(uid,updatedUser) => await usersRepository.updateById(uid, updatedUser)
const readByIdServices = async(uid)=> await usersRepository.readById(uid)
const readByServices = async(filter) => await usersRepository.readBy(filter)
const destroyByIdServices = async(uid) => await usersRepository.destroyById(uid)
export{updateByIdServices, readByIdServices, readByServices,destroyByIdServices}