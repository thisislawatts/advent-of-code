import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(str => {
    const [dir, num] = str.split(' ');
    let direction: 'x' | 'y' = 'x';
    let distance = parseInt(num, 10);

    if (['down', 'up'].includes(dir)) {
      direction = 'y';

      if (dir === 'up') {
        distance *= -1
      }
    }

    return { direction, distance }
  });

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');

interface Instruction {
  direction: 'x' | 'y';
  distance: number
}

function calculate(input: Instruction[]): number {
  const vector = {
    x: 0,
    y: 0,
  };

  input.map((i: Instruction) => {
    vector[i.direction] += i.distance;
  })

  console.log(vector);
  return vector.x * vector.y;
}

console.log(calculate(exampleInput) === 150);
console.log(calculate(exerciseInput));
