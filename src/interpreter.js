const { Lexer } = require("./Lexer");
const { Func, Integer } = require("./types");

const FILE = "./main.oba";

let defaultMemory = {
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

module.exports = class Interpreter {
    constructor(code, memory) {
        if (memory == undefined) {
            memory = defaultMemory;
        }
        this.lex = new Lexer(code);
        this.code = this.lex.createTokens();
        this.memory = memory;
        this.que = [];
    }

    interpret = () => {
        for (const elem in this.code) {
            const elm = this.code[elem];
            console.log(elm);
            // if (typeof elm == "object") {
            //     console.log(elm.getClass());
            // } else {
            //     console.log(typeof elm);
            // }
            console.log(elm.constructor.name);
        }
    };

    compile = () => {
        console.log("🚧COMPILE IS STILL BEING BUILT🚧");
    };
};
