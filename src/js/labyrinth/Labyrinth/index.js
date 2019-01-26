import Maze from '@labyrinth/Maze';

export default class Labyrinth extends Maze {
    constructor({
        numCols,
        numRows
    }) {
        super({
            numCols,
            numRows
        });
    }

    addOccupant(occupant) {
        this.occupant = occupant;
        this.start.setOccupant(occupant);
    }

    moveOccupant(direction) {
        const cell = this.occupant.getCell();

        if (!cell.canAccess(direction)) {
            throw new Error(`Cannot move ${direction}.`);
        }

        const neighbor = this.getNeighbor(cell, direction);

        cell.removeOccupant();
        neighbor.setOccupant(this.occupant);
    }
}