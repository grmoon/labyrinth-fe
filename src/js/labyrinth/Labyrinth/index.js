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
        this.occupant.move(direction);
    }
}