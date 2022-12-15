exports.InfiniteArgs = class InfiniteArgs {
    constructor(argName) {
        this.argName = argName;
    }
};

exports.Func = class Func {
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
};
