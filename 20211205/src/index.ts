import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => {
    return v
      .split(' -> ')
      .map(v =>
        v.split(',').map(n => parseInt(n, 10))
      )
  })

const exampleInput = loadFile('./example.txt')

function calculate(input: any[]): number {

  const affectedCoords: any = {};

  input.map(([start,end]) => {
    // Ignore lines which are not
    // vertical OR horizontal
    if (start[0] === end[0] || start[1] === end[1]) {
      console.log({ start, end });
      const minX = Math.min(start[0], end[0]);
      const maxX = Math.max(start[0], end[0]);

      const minY = Math.min(start[1], end[1]);
      const maxY = Math.max(start[1], end[1]);

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          if (!affectedCoords[`${x}:${y}`]) {
            affectedCoords[`${x}:${y}`] = 1;
          } else {
            affectedCoords[`${x}:${y}`]++;
          }
        }
      }
    }
  });

  console.log({ affectedCoords });

  return Object.values(affectedCoords).filter((v: any) => v >= 2).length;
}

const output = calculate(exampleInput);
console.log(output, output === 5);
console.log(calculate(loadFile('./input.txt')));
