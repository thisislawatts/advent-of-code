import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => parseInt(v))

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');

function calculate(input: number[]): number {
  let numberOfTimesValueLargerThanPrevious = 0;
  for (let i = 1; i <= input.length; i++) {
    const current = input[i];
    const prev = input[i - 1];

    if (current > prev) {
      numberOfTimesValueLargerThanPrevious++;
    }
  }
  return numberOfTimesValueLargerThanPrevious;
}

console.log(calculate(exampleInput) === 7);
console.log(calculate(exerciseInput));
