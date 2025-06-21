import { usersManager } from "../data/managers/mongo/manager.mongo.js";

const updateByIdServices = async(uid,updatedUser) => await usersManager.updateById(uid, updatedUser)

export{updateByIdServices}