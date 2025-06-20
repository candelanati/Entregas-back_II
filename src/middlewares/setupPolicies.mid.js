// import { usersManager } from "../dao/factory.js"
import { usersRepository } from "../repositories/users.repository.js";
import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    if (policies.includes("PUBLIC")) return next();
    const token = req?.cookies?.token;
    console.log("🍪 TOKEN:", token); // DEBUG
    const data = verifyToken(token);
    const { user_id, role } = data;
    if (!user_id) return res.json401();
    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    if (!roles[role]) return res.json403();  
    const user = await usersRepository.readById(user_id)
    req.user = user;
    next();
  } catch (error) {
    next(error)
  }
};

export default setupPolicies;
