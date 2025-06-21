import { usersManager } from "../dao/factory.js"

const updateByIdServices = async(uid,updatedUser) => await usersManager.updateById(uid, updatedUser)

export{updateByIdServices}