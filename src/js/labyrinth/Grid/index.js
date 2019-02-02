import Cell from '@labyrinth/Cell';
import Row from '@labyrinth/Row';

export default class Grid {
    constructor({
        gridObject = {},
        numCols,
        numRows
    }) {
        const {
            _numCols = numCols,
            _numRows = numRows,
            _cellsById = new Map()
        } = gridObject;

        this._numCols = parseInt(_numCols);
        this._numRows = parseInt(_numRows);
        this._cellsById = _cellsById;

        if (Object.keys(gridObject).length > 0) {
            this.buildFromGridObject();
        }
        else {
            this.build();
            this.link();
        }
    }

    get grid() {
        return this._grid;
    }

    buildFromGridObject() {
        let row = [];
        this._grid = [];

        this._cellsById.forEach((cellObject, cellId) => {
            if (row.length % this.numCols == 0 && row.length > 0) {
                this._grid.push(row);
                row = [];
            }

            const cell = new Cell({
                cellObject
            });

            this._cellsById.set(cellId, cell);
            row.push(cell)
        });

        this._grid.push(row);
    }

    forEach(callback) {
        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = this._grid[rowIdx]

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                const cell = row[colIdx];

                callback(cell, row, rowIdx, colIdx);
            }
        }
    }

    asArray() {
        return this._grid;
    }

    link() {
        this.forEach((cell, row, rowIdx, colIdx) => {
            const leftNeighbor = row[colIdx - 1] || undefined;
            const rightNeighbor = row[colIdx + 1] || undefined;
            const topNeighbor = this._grid[rowIdx - 1] ? this._grid[rowIdx - 1][colIdx] || undefined : undefined;
            const bottomNeighbor = this._grid[rowIdx + 1] ? this._grid[rowIdx + 1][colIdx] || undefined : undefined;

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
            cell.leftNeighborId = leftNeighbor.id;
        }

        if (rightNeighbor !== undefined) {
            cell.rightNeighborId = rightNeighbor.id;
        }

        if (topNeighbor !== undefined) {
            cell.topNeighborId = topNeighbor.id;
        }

        if (bottomNeighbor !== undefined) {
            cell.bottomNeighborId = bottomNeighbor.id;
        }
    }

    getNeighbors(cell) {
        const neighbors = {};
        const neighborIds = cell.neighborIds;

        for (let direction in neighborIds) {
            const neighborId = neighborIds[direction];

            neighbors[direction] = this._cellsById.get(neighborId);
        }

        return neighbors;
    }

    getNeighbor(cell, direction) {
        const neighborId = cell.neighborIds[direction];

        return this._cellsById.get(neighborId);
    }

    build() {
        this._grid = [];

        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = new Row();

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                let cell = new Cell();

                this._cellsById.set(cell.id, cell);
                row.push(cell);
            }

            this._grid.push(row);
        }
    }

    get(row, col) {
        const _row = this._grid[row];

        return col !== undefined ? _row[col] : _row;
    }

    get numCols() {
        return this._numCols;
    }

    get numRows() {
        return this._numRows;
    }
}