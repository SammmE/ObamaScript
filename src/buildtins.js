const { Class } = require("./Class");
const { Func, InfiniteArgs } = require("./Func");

exports.printFunc = new Func(
    "print",
    true,
    (args) => {
        console.log("print func: ");
        args.forEach((elem) => {
            console.log(elem);
        });
    },
    [new InfiniteArgs("args")]
);

exports.FileSystem = new Class("FileSystem", [
    new Func("readFile", true, (path) => {
        console.log("IT WORKS!");
    }),
]);
