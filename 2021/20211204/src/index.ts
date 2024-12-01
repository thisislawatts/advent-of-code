import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n');

const exampleInput = loadFile('./example.txt')

function calculate(input: string[]) {
  // Parse Input
  const calledNumbers = input[0].split(',').map(s => parseInt(s.trim()));
  let availableBoards: any = [];

  let boardCounter = 0;

  // Load input from boards
  input.slice(2).forEach(ln => {
    if (!availableBoards[boardCounter]) {
      availableBoards[boardCounter] = [];
    }

    if (ln === '') {
      boardCounter++;
      return;
    }

    availableBoards[boardCounter].push(
      ln.split(' ')
        .map(s => s.trim())
        .filter(Boolean) // Remove empty values
        .map(v => parseInt(v, 10))
    );
  });

  // Create row AND column representation of
  availableBoards = availableBoards.map(boardRows => {
    const columns: any = [];

    boardRows.forEach((rowlist, rowpointer) => {
      rowlist.forEach((cellValue, x: number) => {
        if (!columns[x]) {
          columns[x] = [] as number[];
        }

        columns[x].push(cellValue);
      });
    });

    return {
      rows: boardRows,
      columns,
    }
  })

  const winningBoards: number[] = [];
  let finalNumberToBeDrawn = 0;

  calledNumbers.forEach((num, callNumber) => {
    if (winningBoards.length !== availableBoards) {
      // check boards
      availableBoards
        .forEach((board, boardNumber) => {
          if (winningBoards.includes(boardNumber)) {
            return;
          }

          board.rows.forEach((row) => {
            row.forEach((cell, idx) => {
              if (cell === num) {
                row.splice(idx, 1);
              }
            });

            if (row.length === 0) {
              winningBoards.push(boardNumber);
              finalNumberToBeDrawn = num;
              return;
            }
          });

          board.columns.forEach((column) => {
            column.forEach((cell, idx) => {
              if (cell === num) {
                column.splice(idx, 1);
              }
            });

            if (column.length === 0) {
              winningBoards.push(boardNumber);
              finalNumberToBeDrawn = num;
              return;
            }
          });
        });
    }
  });

  return arraySum(availableBoards[winningBoards[winningBoards.length - 1]].rows) * finalNumberToBeDrawn;
}

function arraySum(arr) {
  if (!Array.isArray(arr)) {
    return arr;
  }

  return arr.reduce((a, b) => {
    return arraySum(a) + arraySum(b)
  }, 0);
}

const result = calculate(exampleInput);
console.log(result, result === 1924);
console.log(calculate(
  loadFile('./input.txt')
));
