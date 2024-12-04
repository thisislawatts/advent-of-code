package main

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

func solve(input string) int {
	// TODO: Solve the problem
	// Compile the regex
	re := regexp.MustCompile(`(?i)mul\((\d{1,3}),(\d{1,3})\)`)

	// Find all matches
	matches := re.FindAllString(input, -1)

	sum := 0

	// Print valid instructions
	fmt.Println("Valid mul instructions:")
	for _, match := range matches {
		fmt.Println(match)
		var a int
		var b int
		fmt.Fscanf(strings.NewReader(match), "mul(%d,%d)", &a, &b)
		sum += a * b
	}

	return sum
}

func main() {
	input, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}
	fmt.Printf("Result %v", solve(string(input)))
}
