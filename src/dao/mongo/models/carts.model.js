import mongoose from 'mongoose'

const cartsSchema = new mongoose.Schema(
    {
        products: [
            {
                _id:false,
                product: {
                    type: mongoose.Schema.Types.ObjectId,  // Referencia a un producto
                    ref: 'productos',  // Nombre de la colección de productos
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1  // Evitar cantidades menores a 1
                }
            }
        ]
    },
    {
        timestamps:true
    }
)

const CartModel = mongoose.model('carritos', cartsSchema);
export default CartModel;