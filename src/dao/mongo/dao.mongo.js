import Product from "./models/products.model.js";
import Cart from "./models/carts.model.js";
import User from "./models/users.model.js";

class DaoMongo {
  constructor(model) {
    this.model = model;
  }
  createOne = async (data) => await this.model.create(data);
  readAll = async (filter) => await this.model.find(filter).lean();
  readById = async (id) => await this.model.findOne({ _id: id }).lean();
  readByIdMongoose = async (id) => await this.model.findOne({_id: id}); //sin .lean() para no perder las funcionalidades de mongoose
  readByIdWithPopulate = async (id, populatePath) =>  await this.model.findById(id).populate(populatePath).lean() //con populate
  readBy = async (filter) => await this.model.findOne(filter).lean();
  updateById = async (id, data) => await this.model.findByIdAndUpdate(id, data, { new: true })//.lean();
  updateOne = async (filter, data, options = {}) => await this.model.updateOne(filter, data, options);
  destroyById = async (id) => await this.model.findByIdAndDelete(id).lean();
  readManyByIds = async (ids) => await this.model.find({ _id: { $in: ids } }).lean();
}

const productsManager = new DaoMongo(Product);
const cartsManager = new DaoMongo(Cart);
const usersManager = new DaoMongo(User);

export { productsManager, cartsManager, usersManager };