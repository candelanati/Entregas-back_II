import dbConnect from "../helpers/dbConnect.helper.js"
const { PERSISTENCE,LINK_DB } = process.env

let dao = {}

switch (PERSISTENCE) {
    case "fs":
        {
            console.log("fs connected");
            const { usersManager, productsManager, cartsManager } = await import("./fs/dao.fs.js")
            dao = { usersManager, productsManager, cartsManager }
        }
        break
    default:
        {
            await dbConnect(LINK_DB)
            const { usersManager, productsManager, cartsManager } = await import("./mongo/dao.mongo.js")
            dao = { usersManager, productsManager, cartsManager }
        }
        break
}

const { usersManager, productsManager, cartsManager } = dao
export { usersManager, productsManager, cartsManager }
export default dao