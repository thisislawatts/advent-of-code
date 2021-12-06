import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split(',')
  .map(v => parseInt(v))

const exampleInput = loadFile('./example.txt')

function calculate(fishList: number[], numberOfDays = 80): number {

  let days = 1;
  while (days <= numberOfDays) {
    days++;

    fishList.map((v, idx) => {
      let newValue = v - 1;

      if (newValue < 0) {
        newValue = 6;
        fishList.push(8);
      }
      fishList[idx] = newValue;
    })
  }

  return fishList.length;
}

const result = calculate(exampleInput);
console.log(result, result === 5934);
console.log(calculate(loadFile('./input.txt')))
