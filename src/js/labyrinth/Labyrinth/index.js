import Cell from '@labyrinth/Cell';
import Direction from '@labyrinth/Direction';
import Grid from '@labyrinth/Grid';
import Row from '@labyrinth/Row';

export default class Labyrinth {
    constructor({
        numCols,
        numRows
    }) {
        this.numCols = parseInt(numCols);
        this.numRows = parseInt(numRows);

        this.buildGrid();
        this.linkGrid();

        this.start = this.grid[0][0];
    }

    getNumRows() {
        return this.numRows;
    }

    getNumCols() {
        return this.numCols;
    }

    linkGrid() {
        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = this.grid[rowIdx]

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                const cell = row[colIdx];

                const leftNeighbor = row[colIdx - 1] || undefined;
                const rightNeighbor = row[colIdx + 1] || undefined;
                const topNeighbor = this.grid[rowIdx - 1] ? this.grid[rowIdx - 1][colIdx] || undefined : undefined;
                const bottomNeighbor = this.grid[rowIdx + 1] ? this.grid[rowIdx + 1][colIdx] || undefined : undefined;

                cell.setLeftNeighbor(leftNeighbor);
                cell.setRightNeighbor(rightNeighbor);
                cell.setTopNeighbor(topNeighbor);
                cell.setBottomNeighbor(bottomNeighbor);
            }
        }
    }

    buildGrid() {
        this.grid = new Grid();

        for (let rowIdx = 0; rowIdx < this.numRows; rowIdx++) {
            const row = new Row();

            for (let colIdx = 0; colIdx < this.numCols; colIdx++) {
                row.push(new Cell());
            }

            this.grid.push(row);
        }
    }

    addOccupant(occupant) {
        this.occupant = occupant;
        this.start.setOccupant(occupant);
    }

    moveOccupant(direction) {
        this.occupant.move(direction);
    }

    getGrid() {
        return this.grid;
    }
}