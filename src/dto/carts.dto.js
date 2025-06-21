import crypto from "crypto";
const { PERSISTENCE } = process.env;

class CartsDTO {
  constructor(data) {
    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
    } else {
      this._id = data._id;
    }

    // Asegurarse de que los productos vengan en el formato adecuado
    this.products = Array.isArray(data.products)
      ? data.products.map((item) => ({
          product: item.product,
          quantity: item.quantity || 1,
        }))
      : [];

    if (PERSISTENCE !== "mongo") {
      this.createdAt = new Date();
      this.updatedAt = new Date();
    } else {
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }
}

export default CartsDTO;
