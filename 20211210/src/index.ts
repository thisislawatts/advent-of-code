import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => v.split(''))

const SCORING = { ")": 1, "]": 2, "}": 3, ">": 4 };
const BRACKET_PAIRS = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

function calculate(input: any[]): number {
  let uncorruptedlines: number[] = [];

  // Retrieve valid lines
  for (const line of input) {
    let stack: any[] = [];
    let lineIsValid = true;
    for (const char of line) {
      if (BRACKET_PAIRS.hasOwnProperty(char)) {
        stack.push(BRACKET_PAIRS[char]);
      } else {
        if (stack.pop() !== char) {
          lineIsValid = false;
          break;
        }
      }

    }

    if (lineIsValid) {
      uncorruptedlines.push(
        stack.reverse().reduce((a, b) => {
          return (a * 5) + SCORING[b]
        }, 0)
      );
    }
  }

  uncorruptedlines.sort((a, b) => a - b);

  return uncorruptedlines[Math.floor(uncorruptedlines.length * .5)];
}

const example = calculate(loadFile('./example.txt'))
console.log(example, example === 288957);
console.log(calculate(loadFile('./input.txt')))
