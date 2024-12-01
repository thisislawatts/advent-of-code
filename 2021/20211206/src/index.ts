import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split(',')
  .map(v => parseInt(v))

function calculate(input: number[], numberOfDays = 18): any {

  let days = 0;
  let fishNumbersByAge: number[] = [];

  input.map(age => {
    fishNumbersByAge[age] = (fishNumbersByAge[age] || 0) + 1;
  });


  while (days < numberOfDays) {
    const newDailyFishCount: number[] = [];
    fishNumbersByAge.forEach((qty, age) => {

      if (!qty) {
        return;
      }

      const newAge = age - 1;

      if (newAge < 0) {
        newDailyFishCount[8] = qty;

        newDailyFishCount[6] = (newDailyFishCount[newAge] || 0) + qty;
      } else {
        newDailyFishCount[newAge] = (newDailyFishCount[newAge] || 0) + qty;
      }
    });
    fishNumbersByAge = newDailyFishCount;
    days++;
  }
  return arraySum(fishNumbersByAge);
}

function arraySum(arr): number {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.reduce((a, b) => {
    return arraySum(a) + arraySum(b)
  }, 0);
}

const result = calculate(loadFile('./example.txt'), 256);
console.log(result, result === 26984457539)

console.log(calculate(loadFile('./input.txt'), 256))