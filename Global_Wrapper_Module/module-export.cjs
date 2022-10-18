/**
 * The module is a plain JavaScript Object representing the current module. 
 * It is local to each module and also it is private. 
 * It has exports property which is a plain JavaScript variable, set to module.exports
 * 
 * When we want to export a single class/variable/function from one module to another module, we use module.exports.
 * 
*/
class Calculator {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
 
    add() {
        return this.a + this.b;
    }
    sub() {
        return this.a - this.b;
    }
 
    mul() {
        return this.a * this.b;
    }
 
    div() {
        if (this.b != 0) {
            return this.a / this.b;
        }
        return "divided by zero !!!!";
    }
};
 
module.exports = Calculator;//this is not default exporting

