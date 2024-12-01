package main

import (
	"fmt"
	"log"
	"os"
	"slices"
	"strconv"
	"strings"
)

func main() {

	input, err := os.ReadFile("input.txt")
	if err != nil {
		panic(err)
	}

	// Split input into lines
	lines := strings.Split(string(input), "\n")
	var left []int
	var right []int

	for _, line := range lines {
		// Split line into values
		values := strings.Fields(line)
		if len(values) != 2 {
			log.Fatalf("Invalid line format: %v", line)
		}

		// Convert values to ints
		leftVal, err := strconv.Atoi(values[0])
		if err != nil {
			fmt.Printf("Error converting left to int: %v", err)
		}
		left = append(left, leftVal)

		rightVal, _ := strconv.Atoi(values[1])
		if err != nil {
			fmt.Printf("Error converting right to int: %v", err)
		}
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

	freq := make(map[int]int)
	for _, val := range b {
		freq[val]++
	}

	sum := 0

	for _, val := range a {
		if count, exists := freq[val]; exists {
			sum += val * count
		}
	}
	return sum
}
