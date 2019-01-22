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

    moveLeft() {
        return this.move(Direction.left);
    }

    moveRight() {
        return this.move(Direction.right);
    }

    moveUp() {
        return this.move(Direction.up);
    }

    moveDown() {
        return this.move(Direction.down);
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