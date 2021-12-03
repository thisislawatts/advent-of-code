import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');

function findMatch(input: string[], compFn, pointer = 0, path = '') {
  const modeMap: any = { '0': 0, '1': 0 };

  input.forEach((str) => {
    const bit = str.charAt(pointer);
    modeMap[bit] += 1;
  });

  path += compFn(modeMap);

  const matches = input.filter(s => s.startsWith(path))

  return matches.length === 1 ? matches.pop() : findMatch(matches, compFn, pointer + 1, path);
}

const findCO2Match = (input: string[]) =>
  findMatch(input, (modeMap) => modeMap['1'] >= modeMap['0'] ? '0' : '1')

const findOxygenMatch = (input: string[]) =>
  findMatch(input, (modeMap) => modeMap['1'] >= modeMap['0'] ? '1' : '0')


function calculate(input: string[]): number {

  const oxygen = findOxygenMatch(input);
  const co2 = findCO2Match(input);

  console.log({ oxygen, co2 });

  return parseInt(oxygen, 2) * parseInt(co2, 2);
}

console.log(calculate(exampleInput) === 230);
console.log(calculate(exerciseInput));
