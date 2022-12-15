const {
    PLUS,
    MINUS,
    DIVIDE,
    MULTIPLY,
    MOD,
    EXPONENT,
    LPAREN,
    RPAREN,
    LBRACE,
    RBRACE,
    LBRACK,
    RBRACK,
    Num,
    Str,
} = require("./types.js");

exports.Lexer = class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = -1;
        this.char = null;
        this.advance();
    }

    changeText = (text) => {
        this.text = text;
        this.pos = -1;
        this.char = null;
    };

    advance = () => {
        this.pos++;
        if (this.pos < this.text.length) {
            this.char = this.text[this.pos];
        } else {
            this.char = null;
        }
    };

    createTokens = () => {
        const tokens = [];

        while (this.char != null) {
            if (this.char == " " || this.char == "\t" || this.char == "\n") {
                this.advance();
            } else if (this.char == "+") {
                tokens.push(new PLUS());
                this.advance();
            } else if (this.char == "-") {
                tokens.push(new MINUS());
                this.advance();
            } else if (this.char == "/") {
                tokens.push(new DIVIDE());
                this.advance();
            } else if (this.char == "*") {
                tokens.push(new MULTIPLY());
                this.advance();
            } else if (this.char == "%") {
                tokens.push(new MOD());
                this.advance();
            } else if (this.char == "^") {
                tokens.push(new EXPONENT());
                this.advance();
            } else if (this.char == "(") {
                tokens.push(new LPAREN());
                this.advance();
            } else if (this.char == ")") {
                tokens.push(new RPAREN());
                this.advance();
            } else if (this.char == "{") {
                tokens.push(new LBRACE());
                this.advance();
            } else if (this.char == "}") {
                tokens.push(new RBRACE());
                this.advance();
            } else if (this.char == "[") {
                tokens.push(new LBRACK());
                this.advance();
            } else if (this.char == "]") {
                tokens.push(new RBRACK());
                this.advance();
            } else if (/-?\d/.test(this.char)) {
                let num = "";
                let skip = 1;
                while (skip > 0) {
                    if (/-?\d/.test(this.char)) {
                        num += this.char.toString();
                        this.advance();
                    } else {
                        break;
                    }
                }
                tokens.push(new Num(new Str(num).toInt()));
            } else if (
                this.char == '"' ||
                this.char == "`" ||
                this.char == "'"
            ) {
                let str = "";
                this.advance();
                while (!/(")/gi.test(this.char)) {
                    str += this.char;
                    this.advance();
                }
                tokens.push(new Str(str));
            } else {
                let str = "";
                while (/([A-Z]|_)/gi.test(this.char)) {
                    str += this.char;
                    this.advance();
                }
                tokens.push(str);
                tokens.push(LPAREN);
                this.advance();
            }
        }
        return tokens;
    };
};
