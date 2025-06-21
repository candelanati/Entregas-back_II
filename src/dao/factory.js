const { PERSISTENCE } = process.env

let dao = {}

switch (PERSISTENCE) {
    case "fs":
        {
            const { usersManager, productsManager, cartsManager } = await import("./fs/dao.fs.js")
            dao = { usersManager, productsManager, cartsManager }
        }
        break
    default:
        {
            const { usersManager, productsManager, cartsManager } = await import("./mongo/dao.mongo.js")
            dao = { usersManager, productsManager, cartsManager }
        }
        break
}

const { usersManager, productsManager, cartsManager } = dao
export { usersManager, productsManager, cartsManager }
export default dao