import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n')
  .map(v => {
    const [signal, output] = v.split(' | ')
    // Noramlize values to be in alphabetical order
    return {
      output: output.split(' ').map(str => str.split('').sort().join('')),
      signal: signal.split(' ').map(str => str.split('').sort().join('')).sort((a: string, b: string) => a.length > b.length ? 1 : -1),
    } as SignalAndOuput
  });

interface SignalAndOuput {
  output: string[]
  signal: string[]
}

function calculate(inputList: SignalAndOuput[]): number {
  let sum = 0;

  inputList.forEach(({ output, signal }) => {
    const signalToDigitMap = {};
    signal.map(sig => {
      if (sig.length === 2) {
        signalToDigitMap[sig] = 1
      }

      if (sig.length === 4) {
        signalToDigitMap[sig] = 4
      }

      if (sig.length === 3) {
        signalToDigitMap[sig] = 7
      }


      if (sig.length === 7) {
        signalToDigitMap[sig] = 8
      }


      const oneIs = signal.find(str => str.length === 2)
      const threeIs: any = signal.find((str: string) => str.length === 5 && str.match(new RegExp(`[${oneIs}]`, 'g'))?.length === 2);
      const fourIs = signal.find(str => str.length === 4);

      if (sig.length === 5) {
        // 2, ~3, 5
        if (sig.match(new RegExp(`[${oneIs}]`, 'g'))?.length === 2) {
          signalToDigitMap[sig] = 3
          return;
        }
        // `Four` matches 2 element with `Two`
        // `Four` matches 3 elements with `Five`
        const matches = sig.match(new RegExp(`[${fourIs}]`, 'g'))?.length;

        if (matches === 3) {
          signalToDigitMap[sig] = 5
        } else if (matches === 2) {
          signalToDigitMap[sig] = 2
        }
      }

      if (sig.length === 6) {
        // ~0, ~6, ~9 
        if (sig.match(new RegExp(`[${oneIs}]`, 'g'))?.length !== 2) {
          signalToDigitMap[sig] = 6
          return;
        }

        // 9 contains 3
        if (sig.match(new RegExp(`[${threeIs}]`, 'g'))?.length === 5) {
          signalToDigitMap[sig] = 9
        } else {
          signalToDigitMap[sig] = 0
        }
      }
    });
    // Analyse the `signal` input to understand the valuation
    let readOut = '';
    output.forEach(element => {
      readOut += signalToDigitMap[element];
    });

    sum += parseInt(readOut);
  });

  return sum;
}

const result = calculate(loadFile('./example.txt'));
console.log(result, result === 61229);
console.log(calculate(loadFile('./input.txt')));
