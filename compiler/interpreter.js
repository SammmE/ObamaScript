const fs = require("fs");
const { type } = require("os");

// enums
const FILE = "./main.oba";
const INF = -1;
const ANY = "ANY";

// functions
class Func {
    constructor(name, isJS, method, params) {
        this.name = name;
        this.isJS = isJS;
        this.method = method;
        this.params = params;
    }

    getName = () => {
        return this.name;
    };

    getParams = () => {
        return this.params;
    };

    getMethod = () => {
        return this.method;
    };

    getIsJS = () => {
        return this.isJS;
    };
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
    functions: {
        print: new Func(
            "print",
            true,
            (...args) => {
                args.forEach((elem) => {
                    console.log(elem);
                });
            },
            INF
        ),
    },
    variables: [],
    classes: [],
};

class Interpreter {
    constructor(code, memory) {
        if (typeof code == "string") {
            this.code = this.tokenize(code);
        } else {
            this.code = code;
        }
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
        return this.code[1] == "(";
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

    stringKwd = (inter) => {
        return ['"', "'", "`"].includes(inter);
    };

    funcKwd = (inter) => {
        var isFunc = false;
        for (const fun in this.mem.functions) {
            if (fun == inter) {
                isFunc = true;
            }
        }
        return isFunc;
    };

    eval = (text) => {
        if (typeof text == "string") {
            text = this.tokenize(text);
        }
        const newInterpreter = new Interpreter(text, this.mem);
        return newInterpreter.interpret();
    };

    goUntil = (arr, stop, retType) => {
        if (stop == "}") {
            var openingBraceCounter = 1;
            var retArr = [];
            var arrayLength = arr.length;
            for (var i = 0; i < arrayLength; i++) {
                var checking = arr[i];
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
            var arrayLength = arr.length;
            for (var i = 1; i < arrayLength; i++) {
                var checking = arr[i];
                if (checking == stop) {
                    openingParenCounter -= 1;
                } else if (checking == "(") {
                    openingParenCounter += 1;
                } else {
                    retArr.push(checking);
                }
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

    expression = () => {
        var len = this.code.length;
        var exp = this.code[0];
        var skip = 0;
        for (var i = 1; i < len; i++) {
            var checking = this.code[i];
            exp += checking.replace("\n", "");
            if (this.expressionKwd(checking)) {
                skip += 1;
            }
            if (skip == 0) {
                break;
            }
        }
        return Function(`'use strict'; return (${exp})`)();
    };

    runFunc = () => {
        if (!this.openingParen()) {
            throw new NoOpeningParenthesis(
                "Could not find opening parenthesis for calling '" +
                    this.code[0] +
                    "'"
            );
        }
        var runningFunc = this.code[0];
        this.nextCode();
        var params = this.goUntil(this.code, ")", "arr");
        for (var i = 0; i < params.length + 1; i++) {
            this.nextCode();
        }
        this.nextCode();
        const fun = this.mem.functions[runningFunc];
        if (fun.isJS) {
            // params = params.filter(function (value, index, arr) {
            //     return value != "`" && value != '"' && value != "'";
            // });
            this.eval(params.join(""), "");
            if (fun.params == INF) {
                fun.method(...params);
            }
        }
    };

    interpret = () => {
        if (!this.code.length) {
            throw new InterpretingError("No code in " + FILE);
        }
        while (this.code.length > 0) {
            var inter = this.code[0] || null;
            if (this.variableKwd(inter)) {
                // this.variableDeclaration();
            } else if (this.conditionKwd(inter)) {
                // let possibleReturnValue = this.conditional();
                // if (possibleReturnValue !== undefined) return possibleReturnValue;
            } else if (this.loopKwd(inter)) {
                // this.loop();
            } else if (this.retKwd(inter)) {
                // return this.consumeAndRunUntilBreak();
            } else if (this.expressionKwd(this.code[1])) {
                return this.expression();
            } else if (this.funcKwd(inter)) {
                this.runFunc();
            }
        }
    };
}

interpreter = new Interpreter(fs.readFileSync(FILE).toString(), memory);
interpreter.interpret();
