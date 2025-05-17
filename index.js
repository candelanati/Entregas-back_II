import "dotenv/config.js"
import express from "express"
import {engine} from "express-handlebars"
import __dirname from "./utils.js"
import morgan from "morgan"

// import indexRouter from "./src/routers/index.router.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
// import errorHandler from "./src/middlewares/errorHandler.js"
import dbConnect from "./src/helpers/dbConnect.helper.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"

/*server settings*/
const server = express()
const port= process.env.PORT || 8080 //si no existe la variable en .env se aplica el 8080
const ready = async()=>{
	console.log("server ready on port: "+port)
	await dbConnect(process.env.LINK_DB)
}
server.listen(port,ready)

/*engine settings*/
server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views",__dirname+"/src/views") //__dirname es la ubicacion de la carpeta raiz y la obtenemos en el utils.js

/*middlewares settings*/
server.use(express.json()) //habilita el json y el req.body
server.use(express.urlencoded({extended:true})) //habilito la lectura de parametros y querys complejas
server.use(express.static("public")) // si uso public, lo tengo q configurar, usando la carpeta estatica y aclarando el nombre
server.use(morgan("dev")) //morgan (opcional) me informa que solicitud esta llegando, dando info muy importante con la que yo puedo chequear si esta bien el metodo, si esta bien la ruta, si esta bien el parametro, etc

/*router settings*/
server.use("/",indexRouter)
server.use(pathHandler) //es un middleware pero va aca porque es un middleware para rutas
server.use(errorHandler)