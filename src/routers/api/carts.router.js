import { Router } from "express";
import { cartsManager } from "../../data/managers/mongo/manager.mongo.js";
import mongoose from "mongoose"

const {isValidObjectId}=mongoose
const cartsRouter = Router()

const readById = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const createOne = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const createOneProduct = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const updateById = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const updateProductById = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const destroyById = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}
const destroyProductById = async (req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

cartsRouter.get("/:id",readById)
cartsRouter.post("/:id",createOne)
cartsRouter.post("/:cid/product/:pid",createOneProduct)
cartsRouter.put("/:id",updateById)
cartsRouter.put("/:cid/products/:pid",updateProductById)
cartsRouter.delete("/:id",destroyById)
cartsRouter.delete("/:cid/products/:pid",destroyProductById)


export default cartsRouter