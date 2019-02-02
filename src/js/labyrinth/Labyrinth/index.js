import Maze from '@labyrinth/Maze';

export default class Labyrinth extends Maze {
    constructor({
        labyrinthObject,
        numCols,
        numRows
    }) {
        super({
            mazeObject: labyrinthObject,
            numCols,
            numRows
        });
    }

    addOccupant(occupant) {
        this.occupant = occupant;
        this.start.occupant = occupant;
    }

    moveOccupant(direction) {
        const cell = this.occupant.cell;

        if (!cell.canAccess(direction)) {
            throw new Error(`Cannot move ${direction}.`);
        }

        const neighbor = this.getNeighbor(cell, direction);

        cell.removeOccupant();
        neighbor.occupant = this.occupant;

        return neighbor;
    }
}