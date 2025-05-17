const errorHandler = (err,req,res,next)=>{
    console.log(err)
    const error = err.message||"server error"
    const statusCode = err.statusCode || 500
    const {method, originalUrl:url} = req
    res.status(statusCode).json({error, method,url})
}
export default errorHandler