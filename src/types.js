exports.PLUS = "PLUS";
exports.MINUS = "MINUS";
exports.DIVIDE = "DIVIDE";
exports.MULTIPLY = "MULTIPLY";
exports.MOD = "MOD";
exports.EXPONENT = "EXPONENT";
exports.LPAREN = "LPAREN";
exports.RPAREN = "RPAREN";
exports.LBRACE = "LBRACE";
exports.RBRACE = "RBRACE";
exports.LBRACK = "LBRACK";
exports.RBRACK = "RBRACK";

exports.Str = class Str {
    constructor(str) {
        if (typeof str != "string") {
            throw new TypeError(`${str} is not a string!`);
        }
        this.str = str;
    }

    toInt = () => {
        return parseInt(this.str);
    };
};

exports.Integer = class Integer {
    constructor(number) {
        if (typeof number != "number") {
            throw new TypeError(`${number} is not a string!`);
        }
        this.num = number;
    }

    toString = () => {
        return this.num.toString();
    };
};

exports.Func = class Func {
    constructor(name, isJS, method, params) {
        this.name = name;
        this.isJS = isJS;
        this.method = method;
        this.params = params;
    }

    getName = () => {
        return this.name;
    };

    getParams = () => {
        return this.params;
    };

    getMethod = () => {
        return this.method;
    };

    getIsJS = () => {
        return this.isJS;
    };
};
