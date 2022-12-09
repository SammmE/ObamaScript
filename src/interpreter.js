const fs = require("fs");
const { Lexer } = require("./Lexer");
const { Func, Integer } = require("./types");

const FILE = "./main.oba";

let memory = {
    functions: {
        print: new Func(
            "print",
            true,
            (...args) => {
                console.log("print func: ");
                args.forEach((elem) => {
                    console.log(elem);
                });
            },
            [new Integer(Infinity)]
        ),
    },
    variables: [],
    classes: [],
};

class Interpreter {
    constructor(code, memory) {
        this.lex = new Lexer(code, memory.functions);
        this.code = this.lex.createTokens();
        this.memory = memory;
    }

    interpret = () => {
        console.log(this.code);
    };
}

interpreter = new Interpreter(fs.readFileSync(FILE).toString(), memory);
interpreter.interpret();
