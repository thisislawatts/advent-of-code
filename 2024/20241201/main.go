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

	fmt.Printf("Total distance: %v\n", total)

	// Similary score of left vs right
	fmt.Printf("Total similarity: %v\n", similarity(left, right))
}

func similarity(a []int, b []int) int {
	leftSum := 0
	rightSum := 0

	for i := 0; i < len(a); i++ {
		multiplier := 0
		for j := 0; j < len(b); j++ {
			if a[i] == b[j] {
				multiplier++
			}
		}
		leftSum += a[i] * multiplier
	}
	return leftSum + rightSum
}
