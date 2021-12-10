import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => v.split(''))

const SCORING = { ")": 3, "]": 57, "}": 1197, ">": 25137 };
const BRACKET_PAIRS = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
};

function calculate(input: any[]): number {
  let corrupted = 0;
  for (const line of input) {
    let stack: any[] = [];
    for (const char of line) {
      if (BRACKET_PAIRS.hasOwnProperty(char)) {
        stack.push(BRACKET_PAIRS[char]);
      } else {
        if (stack.pop() !== char) {
          corrupted += SCORING[char];
          break;
        }
      }
    }
  }

  return corrupted;
}

const example = calculate(loadFile('./example.txt'))
console.log(example, example === 26397);
