const createCb = (req, res, next) => {
  try {
    req.session.role = "ADMIN";
    req.session.mode = "dark";
    const message = "Sessions vence en 7 dias";
    return res.status(201).json({ message });
  } catch (error) {
    next(error);
  }
};
const readCb = (req, res, next) => {
  try {
    const session = req.session;
    return res.status(200).json({ session });
  } catch (error) {
    next(error);
  }
};
const destroyCb = (req, res, next) => {
  try {
    req.session.destroy();
    const message = "Sessions eliminada";
    return res.status(200).json({ message });
  } catch (error) {
    next(error);
  }
};

const currentCb = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return res.status(200).json({
      message: "Usuario autenticado correctamente",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};


export { createCb, readCb, destroyCb , currentCb};
