exports.InterpretingError = class InterpretingError extends Error {
    constructor(message) {
        super(message);
        this.name = "InterpretingError";
    }
};

exports.NoOpeningParenthesis = class NoOpeningParenthesis extends Error {
    constructor(message) {
        super(message);
        this.name = "NoOpeningParenthesis";
    }
};

exports.NoClosingParenthesis = class NoOpeningParenthesis extends Error {
    constructor(message) {
        super(message);
        this.name = "NoClosingParenthesis";
    }
};

exports.TypeError = class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
};
