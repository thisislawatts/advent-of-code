import * as fs from 'fs';

const loadFile = (filepath: string) => fs.readFileSync(filepath, { encoding: 'utf-8' })
  .split('\n');

const exampleInput = loadFile('./example.txt')

function calculate(input: string[]) {
  // Parse Input
  const calledNumbers = input[0].split(',').map(s => parseInt(s.trim()));
  let boards: any = [];

  let boardCounter = 0;

  // Load input from boards
  input.slice(2).forEach(ln => {
    if (!boards[boardCounter]) {
      boards[boardCounter] = [];
    }

    if (ln === '') {
      boardCounter++;
      return;
    }

    boards[boardCounter].push(
      ln.split(' ')
        .map(s => s.trim())
        .filter(Boolean) // Remove empty values
        .map(v => parseInt(v, 10))
    );
  });

  // Create row AND column representation of board
  boards = boards.map(boardRows => {
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

  let winningBoard: any = null;
  let finalNumberToBeDrawn = 0;

  calledNumbers.forEach((num) => {
    if (winningBoard === null) {
      // check boards
      boards.forEach((board, boardNumber) => {
        board.rows.forEach((row) => {
          row.forEach((cell, idx) => {
            if (cell === num) {
              row.splice(idx, 1);
            }
          });

          if (row.length === 0) {
            console.log(`Board ${boardNumber} wins thanks to ${num}`);
            console.log(boards[boardNumber]);
            winningBoard = boardNumber;
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
            console.log(`Board ${boardNumber} wins thanks to ${num}`);
            console.log(boards[boardNumber]);
            winningBoard = boardNumber;
            finalNumberToBeDrawn = num;
            return;
          }
        });
      });
    }
  });

  function arraySum(arr) {
    if (!Array.isArray(arr)) {
      return arr;
    }

    return arr.reduce((a, b) => {
      return arraySum(a) + arraySum(b)
    }, 0);
  }

  return arraySum(boards[winningBoard].rows) * finalNumberToBeDrawn;
}

console.log(calculate(exampleInput) === 4512);
console.log(calculate(
  loadFile('./input.txt')
));
