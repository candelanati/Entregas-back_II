import { usersRepository } from "../repositories/users.repository.js"
const updateByIdServices = async(uid,updatedUser) => await usersRepository.updateById(uid, updatedUser)

export{updateByIdServices}