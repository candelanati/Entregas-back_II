import { usersManager } from "../dao/factory.js"
class UsersRepository{
    updateById = async(uid,updatedUser) => await usersManager.updateById(uid, updatedUser)
    readById = async(uid)=> await usersManager.readById(uid)
    readBy = async(filter) => await usersManager.readBy(filter)
    createOne = async(data)=>await usersManager.createOne(data)
}

const usersRepository =  new UsersRepository()
export {usersRepository}