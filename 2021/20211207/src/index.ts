import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split(',')
  .map(v => parseInt(v))

function calculate(input: number[]): number {
  const crabShipsFuelSpend = [];

  for (var i = Math.min(...input); i < Math.max(...input); i++) {
    let fuel = 0;

    input.forEach(crabShipPosition => {
      fuel += fuelBurn(Math.abs(i - crabShipPosition))
    });

    crabShipsFuelSpend[i] = fuel;
  }

  return Math.min(...crabShipsFuelSpend);
}

const fuelBurn = (n: number) => n * (n + 1) / 2;

const result = calculate(loadFile('./example.txt'));
console.log(result, result === 168);
console.log(calculate(loadFile('./input.txt')));
