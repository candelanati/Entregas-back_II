import { genSaltSync, hashSync, compareSync } from "bcrypt";
import bcrypt from "bcrypt"

const createHash = (pass) => hashSync(pass, genSaltSync(10));
const compareHash = (pass, dbPass) => compareSync(pass, dbPass);

const isValidPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export { createHash, compareHash, isValidPassword};
