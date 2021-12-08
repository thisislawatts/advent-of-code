import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => {
    const [signal, output] = v.split(' | ')
    return {
      output: output.split(' ').map(str => str.split('').sort().join('')),
      signal: signal.split(' '),
    }
  });

function calculate(inputList: any): number {
  const digitUsage: any = [];
  
  inputList.forEach(({ output }) => {
    output.forEach(element => {
      digitUsage[element.length] = (digitUsage[element.length] || 0) + 1
    });
  });
  
  console.log({ digitUsage });
  // console.log(digitUsage['cg'], digitUsage['bcdf'], digitUsage['acf'], digitUsage['abcdefg'])
  return digitUsage[2] + digitUsage[3] + digitUsage[4] + digitUsage[7];
}

const result = calculate(loadFile('./example.txt'));
console.log(result, result === 26);
console.log(calculate(loadFile('./input.txt')));
