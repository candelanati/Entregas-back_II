import { response, Router } from "express";

const productsRouter = Router()

const createOne = (req,res,next)=>{
    try {
        res.status(200).json({response:true})
    } catch (error) {
        next(error)//lleva al errorHandler
    }
}
const readAll = (req,res,next)=>{
    try {
        res.status(200).json({response:true})
    } catch (error) {
        next(error)//lleva al errorHandler
    }
}
const readById = (req,res,next)=>{
    try {
        res.status(200).json({response:true})
    } catch (error) {
        next(error)//lleva al errorHandler
    }
}
const updateById = (req,res,next)=>{
    try {
        res.status(200).json({response:true})
    } catch (error) {
        next(error)//lleva al errorHandler
    }
}
const destroyById = (req,res,next)=>{
    try {
        res.status(200).json({response:true})
    } catch (error) {
        next(error)//lleva al errorHandler
    }
}

productsRouter.post("/",createOne)
productsRouter.get("/",readAll)
productsRouter.get("/:id",readById)
productsRouter.put("/:id",updateById)
productsRouter.delete("/:id",destroyById)

export default productsRouter