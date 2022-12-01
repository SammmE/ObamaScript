const fs = require("fs");

// enums
const FILE = "./main.gay";
const INF = "INF";
const ANY = "ANY";

// functions
class Param {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    isInf() {
        return this.type == INF ? true : false;
    }
}

class Func {
    constructor(name, isJS, method, params) {
        this.name = name;
        this.isJS = isJS;
        this.method = method;
        this.params = [];
        params.forEach((element) => {
            this.params.push(new Param(element.name, element.type));
        });
    }
}

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

let memory = {
    functions: [
        new Func(
            "print",
            true,
            (...args) => {
                args.forEach((elem) => {
                    console.log(elem);
                });
            },
            [INF]
        ),
    ],
    variables: [],
    classes: [],
};

class Interpreter {
    constructor(code, memory, fileName) {
        this.code = this.tokenize(code);
        this.FILE = fileName;
        this.mem = memory;
    }

    tokenize = (text) => {
        var regex =
            /\s*(=>|["-+*\][\/\%:\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
        return text.split(regex).filter(function (s) {
            return !s.match(/^\s*$/);
        });
    };

    nextCode = () => {
        this.code.shift();
    };

    openingParen = () => {
        return this.code[1] === "(";
    };

    variableKwd = (inter) => {
        return ["int", "arr", "str", "any"].includes(inter);
    };

    conditionKwd = (inter) => {
        return ["if", "elif", "else"].includes(inter);
    };

    loopKwd = (inter) => {
        return ["while", "from"].includes(inter);
    };

    retKwd = (inter) => {
        return ["ret", "res"].includes(inter);
    };

    expressionKwd = (inter) => {
        return ["+", "-", "*", "/", "^", "%"].includes(inter);
    };

    goUntil = (stop, retType) => {
        if (stop == "}") {
            var openingBraceCounter = 1;
            var retArr = [];
            var arrayLength = this.code.length;
            for (var i = 0; i < arrayLength; i++) {
                checking = this.code[i];
                if (checking == stop) {
                    openingBraceCounter -= 1;
                } else if (checking == "{") {
                    openingBraceCounter += 1;
                }
                retArr.push(checking);
                if (openingBraceCounter == 0) {
                    if (retType == "string") {
                        return retArr.join("");
                    } else if (retType == "arr") {
                        return retArr;
                    } else {
                        throw Error(
                            "Return type " +
                                retType +
                                " does not exist in interpreter.goUnil"
                        );
                    }
                }
            }
        } else if (stop == ")") {
            var openingParenCounter = 1;
            var retArr = [];
            var arrayLength = this.code.length;
            for (var i = 0; i < arrayLength; i++) {
                checking = this.code[i];
                if (checking == stop) {
                    openingParenCounter -= 1;
                } else if (checking == "(") {
                    openingParenCounter += 1;
                }
                retArr.push(checking);
                if (openingParenCounter == 0) {
                    if (retType == "string") {
                        return retArr.join("");
                    } else if (retType == "arr") {
                        return retArr;
                    } else {
                        throw Error(
                            "Return type " +
                                retType +
                                " does not exist in interpreter.goUnil"
                        );
                    }
                }
            }
        } else {
        }
    };

    runFunc = () => {
        if (!this.openingParen()) {
        }
        runningFunc = this.code[0];
        this.nextCode();
    };

    interpret = () => {
        if (!this.code.length) {
            throw new InterpretingError("No code in " + FILE);
        }
        while (this.code.length) {
            var inter = this.code[0] || null;
            if (this.variableKwd(inter)) {
                // this.variableDeclaration();
            } else if (this.conditionKwd(inter)) {
                console.log("found condition");
                // let possibleReturnValue = this.conditional();
                // if (possibleReturnValue !== undefined) return possibleReturnValue;
            } else if (this.loopKwd(inter)) {
                console.log("found loop");
                // this.loop();
            } else if (this.retKwd(inter)) {
                console.log("found return statement");
                // return this.consumeAndRunUntilBreak();
            } else if (this.expressionKwd(inter)) {
                console.log("found expression");
                // let result = this.expression();
            } else {
                console.log("found function");
                this.runFunc();
            }
        }
    };
}

interpreter = new Interpreter(fs.readFileSync(FILE).toString(), memory);
interpreter.interpret();
