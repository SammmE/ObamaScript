const { Lexer } = require("./Lexer");
const {
    PLUS,
    MINUS,
    MULTIPLY,
    DIVIDE,
    MOD,
    Operation,
    Num,
} = require("./types");
const { printFunc } = require("./buildtins");

const FILE = "./main.oba";

let defaultMemory = {
    functions: {
        print: printFunc,
    },
    classes: [],
};

module.exports = class Interpreter {
    constructor(tokens, memory) {
        if (memory == undefined) {
            memory = defaultMemory;
        }
        this.lex = new Lexer(tokens);
        this.tokens = this.lex.createTokens();
        this.memory = memory;
        this.queue = [];
        this.watching = this.tokens[0];
        this.next = this.tokens[1];
    }

    move = () => {
        let ret = this.tokens.shift();
        this.watching = this.tokens[0];
        this.next = this.tokens[1];
        return ret;
    };

    makeExpression = () => {
        let exp = this.watching.toString();
        let isNum = false;
        this.move();
        console.log(this.tokens);
        while (true) {
            if (this.watching instanceof Num) {
                exp += this.watching.toString();
                if (isNum) {
                    break;
                } else {
                    isNum = true;
                }
                this.move();
            } else {
                exp += "+";
                isNum = false;
                this.move();
            }
        }
        console.log(exp);
    };

    interpret = () => {
        while (this.tokens.length) {
            if (this.next instanceof Operation) {
                return this.makeExpression();
            }

            this.move();
        }
    };

    compile = () => {
        console.log("🚧COMPILE IS STILL BEING BUILT🚧");
    };
};
