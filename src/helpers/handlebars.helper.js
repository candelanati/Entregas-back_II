export const handlebarsHelpers = {
  eq: (a, b) => a === b,
  neq: (a, b) => a !== b,
  lt: (a, b) => a < b,
  gt: (a, b) => a > b,
  and: (a, b) => a && b,
  or: (a, b) => a || b,
  multiply: (a, b) => a * b,
  total: function (products) {
    if (!Array.isArray(products)) return 0
    return products.reduce((acc, item) => {
      if (item.product && item.quantity) {
        return acc + item.product.price * item.quantity
      }
      return acc
    }, 0)
  },
  isEmpty: (value) => {
    if (typeof value !== "string" || value.trim() === "") return true;

    // Verifica que sea una URL válida que comience con http(s) y tenga formato de imagen
    const isValidUrl = /^(http|https):\/\/.+\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/.test(value.trim());

    return !isValidUrl;
  }
};
