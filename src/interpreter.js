const fs = require("fs");

const FILE = "./main.oba";
const ANY = "ANY";

// errors
class InterpretingError extends Error {
    constructor(message) {
        super(message);
        this.name = "InterpretingError";
    }
}

class NoOpeningParenthesis extends Error {
    constructor(message) {
        super(message);
        this.name = "NoOpeningParenthesis";
    }
}

class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
}
    
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
            [...args]
        ),
    },
    variables: [],
    classes: [],
};

class Interpreter {
    constructor(code, memory) {}

    interpret = () => {};
}

interpreter = new Interpreter(fs.readFileSync(FILE).toString(), memory);
interpreter.interpret();
