import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => v.split('').map(s => parseInt(s, 10)))

function hasLowerAdjacentValues(list, x, y, value) {
  const adjacent = [
    list[y - 1]?.[x], // top
    list[y + 1]?.[x], // bottom
    list[y]?.[x - 1], // left 
    list[y]?.[x + 1], // right
  ];

  return adjacent.some(val => val <= value);
}

function calculate(input: any[]): number {
  const lowPoints: number[] = []

  input.forEach((row, y) => {
    row.forEach((cell, x) => {
      const adjacentValuesAreLower =
        hasLowerAdjacentValues(input, x, y, cell);

      if (!adjacentValuesAreLower) {
        lowPoints.push(cell);
      }

    });
  });

  console.log(lowPoints);

  return arraySum(lowPoints.map(v => v += 1));
}

function arraySum(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.reduce((a, b) => {
    return arraySum(a) + arraySum(b)
  }, 0);
}

const exampleInput = loadFile('./example.txt')
console.log(calculate(exampleInput) === 15);
console.log(calculate(loadFile('./input.txt')))