package main

import (
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

var left []int
var right []int

func main() {

	input, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	// Split input into lines
	lines := strings.Split(string(input), "\n")

	for _, line := range lines {
		// Split line into values
		values := strings.Split(line, "   ")

		// Convert values to ints
		leftVal, _ := strconv.Atoi(values[0])
		left = append(left, leftVal)

		rightVal, _ := strconv.Atoi(values[1])
		right = append(right, rightVal)
	}

	// Sort left and right
	slices.Sort(left)
	slices.Sort(right)

	total := 0
	for i := 0; i < len(left); i++ {
		if left[i] > right[i] {
			total += left[i] - right[i]
		} else {
			total += right[i] - left[i]
		}

	}

	fmt.Printf("Total: %v\n", total)

	fmt.Printf("Hello %v", total)
}
