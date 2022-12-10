exports.printFunc = new Func(
    "print",
    true,
    (...args) => {
        console.log("print func: ");
        args.forEach((elem) => {
            console.log(elem);
        });
    },
    [new Num(Infinity)]
);
