import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => parseInt(v))

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');

/**
 * Takes an input array and transforms
 * it to a set of values which represent a
 * sliding window
 */
function transformInputToSlidingWindow(arr: number[]) {
  const outputArr = [];
  const sliceSize = 3;
  for (let i = 0; i <= arr.length - sliceSize; i++) {
    outputArr.push(
      arr.slice(i, i + sliceSize)
        .reduce((a, b) => a + b, 0)
    );
  }

  return outputArr;
}

function calculate(input: number[]): number {
  const transformedInput = transformInputToSlidingWindow(input);
  let numberOfTimesValueLargerThanPrevious = 0;
  for (let i = 1; i <= transformedInput.length; i++) {
    const current = transformedInput[i];
    const prev = transformedInput[i - 1];

    if (current > prev) {
      numberOfTimesValueLargerThanPrevious++;
    }
  }
  return numberOfTimesValueLargerThanPrevious;
}

console.log(calculate(exampleInput) === 5);
console.log(calculate(exerciseInput));
