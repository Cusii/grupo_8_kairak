/**
 * Calcula el precio final con el descuento aplicado
 * @param {Number} price precio original
 * @param {Number} discount descuento
 * @returns {Number} precio final (con descuento aplicado)
 */
const calculateSalePrice = (price, discount) => {
    let newPrice = price - (discount * price /100);
    return parseFloat(Math.round(newPrice * 100) / 100).toFixed(2);
}

module.exports = calculateSalePrice