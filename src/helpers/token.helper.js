import jwt from "jsonwebtoken";

const createToken = (data) => {
  try {
    const token = jwt.sign(
      /* informacion a tokenizar */
      data,
      /* clave secreta para encriptar */
      process.env.JWT_SECRET,
      /* objeto de configuracion de la firma */
      { expiresIn: 7 * 24 * 60 * 60 }
    );
    return token;
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};
const verifyToken = (token) => {
  if (!token) {
    const error = new Error("Token no proporcionado");
    error.statusCode = 401;
    throw error;
  }

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      error.message = 'Token expirado';
      error.statusCode = 401;
    } else if (error.name === 'JsonWebTokenError') {
      error.message = 'Token inválido';
      error.statusCode = 403;
    } else {
      error.statusCode = 500;
    }
    throw error;
  }
};

export { createToken, verifyToken };
