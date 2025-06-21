import crypto from "crypto"
const { PERSISTENCE } = process.env

class ProductsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex")
    }
    this.title = data.title
    this.description = data.description
    this.category = data.category || "Todos"
    this.image = data.thumbnails || []
    this.price = data.price || 1000
    this.stock = data.stock || 10
    this.code = data.code
    this.status = data.status || true
    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date()
      this.updatedAt = new Date()
    }
  }
}

export default ProductsDTO