package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestIsSafe(t *testing.T) {
	reports := fileToReports("testInput.txt")

	assert.Equal(t, true, isSafe(reports[0]))
	assert.Equal(t, false, isSafe(reports[1]))
	assert.Equal(t, false, isSafe(reports[2]))
	assert.Equal(t, true, isSafe(reports[3]))
	assert.Equal(t, true, isSafe(reports[4]))
	assert.Equal(t, true, isSafe(reports[5]))
}
