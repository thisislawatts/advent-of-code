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

function markCoordinateAsMatched(coordMap, pointer: string) {
  coordMap[pointer] = (coordMap[pointer] || 0) + 1
}

type Coordinate = Array<number>;

function calculate(input: Array<Coordinate[]>): number {

  const affectedCoords: any = {};

  input.map(([start, end]) => {
    // Ignore lines which are not
    // vertical OR horizontal
    if (start[0] === end[0] || start[1] === end[1]) {
      const minX = Math.min(start[0], end[0]);
      const maxX = Math.max(start[0], end[0]);

      const minY = Math.min(start[1], end[1]);
      const maxY = Math.max(start[1], end[1]);

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          markCoordinateAsMatched(affectedCoords, `${x}:${y}`);
        }
      }
    } else {
      const minX = Math.min(start[0], end[0]);
      const maxX = Math.max(start[0], end[0]);

      const minY = Math.min(start[1], end[1]);
      const maxY = Math.max(start[1], end[1]);

      const slope = (end[1] - start[1]) / (end[0] - start[0]);

      markCoordinateAsMatched(affectedCoords, `${end[0]}:${end[1]}`);

      for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
          if (slope === (end[1] - y) / (end[0] - x)) {
            markCoordinateAsMatched(affectedCoords, `${x}:${y}`);
          }
        }
      }

    }
  });

  return Object.values(affectedCoords).filter((v: any) => v >= 2).length;
}

const output = calculate(exampleInput);
console.log(output, output === 12);
console.log(calculate(loadFile('./input.txt')));
