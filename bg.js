const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function contains(x, y, x1, x2, y1, y2) {
    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
}

function createGrid(width, height, size) {

    const numCols = Math.floor(width / size) + 1;
    const numRows = Math.floor(height / size) + 1;
    const grid = [];

    for (let i = 0; i < numRows; i++) {

        const row = [];

        for (let j = 0; j < numCols; j++) {
            row.push(Math.random() >= .5 ? 1 : 0);
        }

        grid.push(row);
    }

    return grid;
}

function draw(grid, size) {

    for (let i = 0; i < grid.length; i++) {

        const row = grid[i];

        for (let j = 0; j < row.length; j++) {

            let r, g, b;

            if (row[j]) {
                r = 0;
                g = 75;
                b = 0;
            }
            else {
                r = 0;
                g = 0;
                b = 0;
            }

            context.fillStyle = `rgb(${r}, ${g}, ${b})`;
            context.fillRect(j * size, i * size, size, size);
        }
    }
}

function updateGrid(grid) {

    const newGrid = [];

    for (let i = 0; i < grid.length; i++) {

        const row = grid[i];
        const newRow = [];

        for (let j = 0; j < row.length; j++) {

            newRow.push(updateCell(i, j, grid));
        }

        newGrid.push(newRow);
    }

    return newGrid;
}

function updateCell(x, y, grid) {

    const cell = grid[x][y];
    let numAlive = 0;

    for (let i = x - 1; i < x + 2; i++) {

        const row = grid[i];

        for (let j = y - 1; j < y + 2 && row; j++) {
            numAlive += row[j] || 0;
        }
    }

    numAlive -= cell;

    if (cell === 0) {
        return +(numAlive === 3);
    }

    return +(numAlive === 2 || numAlive === 3);
}

const size = 10;
let currGrid = createGrid(window.innerWidth, window.innerHeight, size);

setInterval(() => {

    currGrid = updateGrid(currGrid);
    draw(currGrid, size);
}, 1000);


// let clicking = false;
// canvas.addEventListener('mousedown', () => {clicking = true});
// canvas.addEventListener('mouseup', () => {clicking = false});
// canvas.addEventListener('mousemove', e => {
//
//     if (!clicking) {
//         return;
//     }
//
//     const x = Math.floor(e.clientY / size);
//     const y = Math.floor(e.clientX / size);
//     currGrid[x][y] = 1;
//     draw(currGrid, size);
// });

// canvas.addEventListener('mousemove', e => {
//
//     const x = Math.floor(e.clientY / size);
//     const y = Math.floor(e.clientX / size);
//     const r = 2;
//
//     for (let i = x - r; i < x + r; i++) {
//
//         const row = currGrid[i];
//
//         for (let j = y - r; row && j < y + r; j++) {
//
//             console.log(i, j);
//             row[j] = 1;
//         }
//     }
//
//     draw(currGrid, size);
// });