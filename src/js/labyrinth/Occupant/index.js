import Direction from '@enums/Direction';

export default class Occupant {
    constructor({ name }) {
        this.name = name;
        this.cell = undefined;
    }

    getName() {
        return this.name;
    }

    setCell(cell) {
        this.cell = cell;
    }

    getCell() {
        return this.cell;
    }

    move(direction) {
        if (!this.cell.canAccess(direction)) {
            throw new Error(`Cannot move ${direction}.`);
        }

        const neighbor = this.cell.getNeighbor(direction);

        this.cell.removeOccupant();
        neighbor.setOccupant(this);
    }
}