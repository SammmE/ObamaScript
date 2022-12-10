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
                tokens.push(PLUS);
                this.advance();
            } else if (this.char == "-") {
                tokens.push(MINUS);
                this.advance();
            } else if (this.char == "/") {
                tokens.push(DIVIDE);
                this.advance();
            } else if (this.char == "*") {
                tokens.push(MULTIPLY);
                this.advance();
            } else if (this.char == "%") {
                tokens.push(MOD);
                this.advance();
            } else if (this.char == "^") {
                tokens.push(EXPONENT);
                this.advance();
            } else if (this.char == "(") {
                tokens.push(LPAREN);
                this.advance();
            } else if (this.char == ")") {
                tokens.push(RPAREN);
                this.advance();
            } else if (this.char == "{") {
                tokens.push(LBRACE);
                this.advance();
            } else if (this.char == "}") {
                tokens.push(RBRACE);
                this.advance();
            } else if (this.char == "[") {
                tokens.push(LBRACK);
                this.advance();
            } else if (this.char == "]") {
                tokens.push(RBRACK);
                this.advance();
            } else if (/^-?\d+$/.test(this.char)) {
                if (/^-?\d+$/.test(this.text[this.pos + 1])) {
                    let num = "";
                    let i = this.pos;
                    while (/^-?\d+$/.test(this.text[i])) {
                        this.advance();
                        num += this.text[i];
                        i++;
                    }
                    tokens.push(new Num(new Str(num).toInt()));
                } else {
                    tokens.push(new Num(new Str(this.char).toInt()));
                }
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
            }
            this.advance();
        }

        return tokens;
    };
};
