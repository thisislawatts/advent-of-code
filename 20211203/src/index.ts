import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');


function calculate(input: string[]): number {
  let gamma = '';
  let epsilon = '';

  const intermediateValue: any = [];

  input.forEach((str) => {
    str.split('').forEach((bit, idx) => {
      if (!intermediateValue[idx]) {
        intermediateValue[idx] = { '0': 0, '1': 0 };
      }

      intermediateValue[idx][bit] += 1;
    });
  });

  intermediateValue.forEach(val => {
    if (val['0'] > val['1']) {
      gamma += '0'
      epsilon += '1'
    } else {
      epsilon += '0'
      gamma += '1'
    }
  });

  console.log({ intermediateValue });
  console.log({gamma, epsilon});

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

console.log(calculate(exampleInput) === 198);
console.log(calculate(exerciseInput));
