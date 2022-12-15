exports.Operation = class Operation {};

exports.PLUS = class PLUS extends exports.Operation {};
exports.MINUS = class MINUS extends exports.Operation {};
exports.DIVIDE = class DIVIDE extends exports.Operation {};
exports.MULTIPLY = class MULTIPLY extends exports.Operation {};
exports.MOD = class MOD extends exports.Operation {};
exports.EXPONENT = class EXPONENT extends exports.Operation {};
exports.LPAREN = class LPAREN {};
exports.RPAREN = class RPAREN {};
exports.LBRACE = class LBRACE {};
exports.RBRACE = class PLUS {};
exports.LBRACK = class PLUS {};
exports.RBRACK = class PLUS {};
exports.FUNKWD = class PLUS {};

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

exports.Num = class Num {
    constructor(number) {
        if (typeof number != "number") {
            throw new TypeError(`${number} is not a string!`);
        }
        this.num = number;
    }

    toString = () => {
        return this.num.toString();
    };

    isFloat = () => {
        return Number(n) === n && n % 1 !== 0;
    };
};
