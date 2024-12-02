package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func fileToReports(file string) [][]int {
	input, err := os.ReadFile(file)
	if err != nil {
		panic(err)
	}

	lines := strings.Split(string(input), "\n")

	reports := make([][]int, len(lines))

	for i, line := range lines {
		values := strings.Fields(line)
		reports[i] = make([]int, len(values))
		for j, value := range values {
			reports[i][j], _ = strconv.Atoi(value)
		}
	}

	return reports
}

func nestedIsSafe(report []int) bool {
	verdict := true
	direction := 1 // 1 = ascending, -1 = descending

	// The results must all be in a consistent order
	// either ascending or descending
	if report[0] > report[1] {
		direction = -1
	}

	for i := 0; i < len(report)-1; i++ {
		if report[i] == report[i+1] {
			verdict = false
			break
		}

		if report[i] > report[i+1] {
			if direction == 1 {
				verdict = false
			}

			if report[i]-report[i+1] > 3 {
				verdict = false
			}
		} else {
			if direction == -1 {
				verdict = false
			}

			if report[i+1]-report[i] > 3 {
				verdict = false
			}
		}
	}

	return verdict
}

func isSafe(report []int) bool {
	fmt.Printf("Checking %v\n", report)

	verdict := false

	for i, _ := range report {
		s := make([]int, len(report))
		copy(s, report)
		s = append(s[:i], s[i+1:]...)
		if nestedIsSafe(s) {
			verdict = true
			break
		}
	}

	return verdict
}

func main() {
	reports := fileToReports("input.txt")

	safeCount := 0
	for _, report := range reports {
		if isSafe(report) {
			safeCount++
		}
	}

	fmt.Printf("Safe Reports: %v\n", safeCount)
}
