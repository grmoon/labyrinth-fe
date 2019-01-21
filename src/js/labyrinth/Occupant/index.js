import Direction from '@labyrinth/Direction';

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

    moveLeft() {
        return this.move(Direction.LEFT);
    }

    moveRight() {
        return this.move(Direction.RIGHT);
    }

    moveUp() {
        return this.move(Direction.UP);
    }

    moveDown() {
        return this.move(Direction.DOWN);
    }

    move(direction) {
        const neighbor = this.cell.getNeighbor(direction);

        if (neighbor === undefined) {
            throw new Error(`Cannot move ${direction}.`);
        }

        this.cell.removeOccupant();
        neighbor.setOccupant(this);
    }
}