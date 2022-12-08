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

    Integer,
    String,
} = require("./types.js");
// exports.Lexer =
class Lexer {
    constructor(text) {
        this.text = text;
        this.pos = -1;
        this.char = null;
        this.advance();
    }

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
            } else if (
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(
                    this.char
                )
            ) {
                // TODO: bigger int?
                tokens.push(new Integer(new String(this.char).toInt()));
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
            }
            this.advance();
        }

        return tokens;
    };
}

const lx = new Lexer("1234567890");
console.log(lx.createTokens());
