package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSimilarity(t *testing.T) {
	t.Run("returns correct answer", func(t *testing.T) {
		result := similarity([]int{3, 4, 2, 1, 3, 3}, []int{4, 3, 5, 3, 9, 3})
		assert.Equal(t, result, 31)
	})
}
