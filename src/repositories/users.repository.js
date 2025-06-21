import { usersManager } from "../dao/factory.js"
class UsersRepository{
    updateByIdServices = async(uid,updatedUser) => await usersManager.updateById(uid, updatedUser)

}

const usersRepository =  new UsersRepository()
export {usersRepository}