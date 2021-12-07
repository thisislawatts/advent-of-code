import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split(',')
  .map(v => parseInt(v))

function calculate(input: number[]): number {
  const crabShipsFuelSpend = [];

  for (var i = Math.min(...input); i < Math.max(...input); i++ ) {
    let fuel = 0;

    input.forEach(crabShipPosition => {
      console.log(`Difference between`, {
        crabShipPosition,
        fuelSpend: Math.abs(i - crabShipPosition)
      });
      fuel += Math.abs(i - crabShipPosition);
    });

    crabShipsFuelSpend[i] = fuel;
  }

  return Math.min(...crabShipsFuelSpend);
}

const result = calculate(loadFile('./example.txt'));
console.log(result, result === 37);
console.log(calculate(loadFile('./input.txt')));
