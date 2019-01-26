import Cell from '@labyrinth/Cell';
import Row from '@labyrinth/Row';

export default class Grid {
    constructor({
        numCols,
        numRows
    }) {
        this.numCols = parseInt(numCols);
        this.numRows = parseInt(numRows);
        this.cellsById = {};

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

            this.linkCell({
                cell,
                topNeighbor,
                leftNeighbor,
                bottomNeighbor,
                rightNeighbor
            });
        });
    }

    linkCell({
        cell,
        topNeighbor,
        leftNeighbor,
        bottomNeighbor,
        rightNeighbor
    }) {
        if (leftNeighbor !== undefined) {
            cell.setLeftNeighborId(leftNeighbor.id);
        }

        if (rightNeighbor !== undefined) {
            cell.setRightNeighborId(rightNeighbor.id);
        }

        if (topNeighbor !== undefined) {
            cell.setTopNeighborId(topNeighbor.id);
        }

        if (bottomNeighbor !== undefined) {
            cell.setBottomNeighborId(bottomNeighbor.id);
        }
    }

    getNeighbors(cell) {
        const neighbors = {};
        const neighborIds = cell.getNeighborIds();

        for (let direction in neighborIds) {
            const neighborId = neighborIds[direction];

            neighbors[direction] = this.cellsById[neighborId];
        }

        return neighbors;
    }

    getNeighbor(cell, direction) {
        const neighborId = cell.getNeighborId(direction);

        return this.cellsById[neighborId];
    }

    build() {
        this.grid = [];

        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = new Row();

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                const cell = new Cell();

                this.cellsById[cell.id] = cell;
                row.push(cell);
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