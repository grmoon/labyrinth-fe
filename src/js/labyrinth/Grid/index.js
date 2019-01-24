import Cell from '@labyrinth/Cell';
import Row from '@labyrinth/Row';

export default class Grid {
    constructor({
        numCols,
        numRows
    }) {
        this.numCols = parseInt(numCols);
        this.numRows = parseInt(numRows);

        this.build();
        this.link();
    }

    forEach(callback) {
        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = this.grid[rowIdx]

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                const cell = row[colIdx];

                callback(cell, row, rowIdx, colIdx);
            }
        }
    }

    asArray() {
        return this.grid;
    }

    link() {
        this.forEach((cell, row, rowIdx, colIdx) => {
            const leftNeighbor = row[colIdx - 1] || undefined;
            const rightNeighbor = row[colIdx + 1] || undefined;
            const topNeighbor = this.grid[rowIdx - 1] ? this.grid[rowIdx - 1][colIdx] || undefined : undefined;
            const bottomNeighbor = this.grid[rowIdx + 1] ? this.grid[rowIdx + 1][colIdx] || undefined : undefined;

            cell.setLeftNeighbor(leftNeighbor);
            cell.setRightNeighbor(rightNeighbor);
            cell.setTopNeighbor(topNeighbor);
            cell.setBottomNeighbor(bottomNeighbor);
        });
    }

    build() {
        this.grid = [];

        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = new Row();

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                row.push(new Cell());
            }

            this.grid.push(row);
        }
    }

    get(row, col) {
        const _row = this.grid[row];

        return col !== undefined ? _row[col] : _row;
    }

    getNumCols() {
        return this.numCols;
    }

    getNumRows() {
        return this.numRows;
    }
}