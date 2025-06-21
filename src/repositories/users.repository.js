import { usersManager } from "../dao/factory.js"
import UsersDTO from "../dto/users.dto.js"
class UsersRepository{
    updateById = async(uid,updatedUser) => await usersManager.updateById(uid, updatedUser)
    readById = async(uid)=> await usersManager.readById(uid)
    readBy = async(filter) => await usersManager.readBy(filter)
    createOne = async(data)=>await usersManager.createOne(new UsersDTO(data))
    destroyById = async (uid) => await usersManager.destroyById(uid)
}

const usersRepository =  new UsersRepository()
export {usersRepository}