import * as fs from 'fs';

interface Instruction {
  direction: Axis;
  distance: number
}

type Axis = 'x' | 'y';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(str => {
    const [dir, num] = str.split(' ');
    let direction: Axis = 'x';
    let distance = parseInt(num, 10);

    if (['down', 'up'].includes(dir)) {
      direction = 'y';

      if (dir === 'up') {
        distance *= -1
      }
    }

    return { direction, distance } as Instruction;
  });

const exampleInput = loadFile('./example.txt')
const exerciseInput = loadFile('./input.txt');

function calculate(input: Instruction[]): number {
  const vector = {
    x: 0,
    y: 0,
    aim: 0,
  };

  input.map((i: Instruction) => {
    if (i.direction === 'x') {
      vector[i.direction] += i.distance;
      vector.y += i.distance * vector.aim
    }

    if (i.direction === 'y') {
      vector.aim += i.distance;
    }
  })

  return vector.x * vector.y;
}

console.log(calculate(exampleInput) === 900);
console.log(calculate(exerciseInput));
