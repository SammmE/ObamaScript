const { Func } = require("./Func");
const { Lexer } = require("./Lexer");
const { Num } = require("./types");
const { Class } = require("./Class");

const FILE = "./main.oba";

let defaultMemory = {
    functions: {
        print: printFunc,
    },
    classes: [
        new Class("FileSystem", [
            new Func("readFile", true, (path) => {
                return;
            }),
        ]),
    ],
};

module.exports = class Interpreter {
    constructor(code, memory) {
        if (memory == undefined) {
            memory = defaultMemory;
        }
        this.lex = new Lexer(code);
        this.code = this.lex.createTokens();
        this.memory = memory;
        this.queue = [];
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
