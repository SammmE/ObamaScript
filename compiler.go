package main

import (
	"fmt"
	"os"
	"strings"
)

type Object struct{}
type Any interface{}

// strings
type str struct {
	Object
	val string
}

// variables
type variable struct {
	value Object
}

// functions
type function struct {
	name         string
	params       []string
	instructions []Any
	gofunc       bool
}

func runFunc(fn function) {
	for i, ins := range fn.instructions {
		if i == 0 {
		}
		runLine(ins)
	}

}

// memory
var Memory struct {
	functions []function
	variables []variable
}

// builtins
func print(toPrint string) {
	fmt.Println(toPrint)
}

// keywords
func isVarKwd(line string) bool {
	return strings.HasPrefix(line, "var")
}

func isFuncKwd(line string) bool {
	return strings.HasPrefix(line, "fn")
}

func isLoopKwd(line string) bool {
	return strings.HasPrefix(line, "while")
}

func runLine(line string) {
	if isVarKwd(line) {

	} else if isFuncKwd(line) {

	} else if isLoopKwd(line) {

	} else {

	}
}

func compile(code string) {
	Memory.functions = []function{
		function{name: "print", params: []string{"toPrint"}, gofunc: true, instructions: []Any{print}},
	}

	for i, line := range strings.Split(code, "\n") {
		if i == 0 {
		}
		runLine(line)
	}
}

func ReadFile(file string) string {
	data, err := os.ReadFile(file)

	if err != nil {
		panic(err)
	}

	return string(data)
}

func main() {
	const FILE = "./main.gay"
	file := ReadFile(FILE)
	compile(file)
}
