
/**
 * When we want to export multiple variables/functions from one module to another, we use exports.
*/
exports.addition = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => {
    if (b != 0) {
        return a / b;
    }
    return `Divided by zero !!!`;
}

// export default {
//     addition,
//     subtract,
//     multiply,
//     divide
// }
console.log("exports", exports);