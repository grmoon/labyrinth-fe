import Direction from '@enums/Direction';

export default class Cell {
    constructor() {
        this.occupant = undefined;
        this.neighbors = {}
        this.access = {};

        for (let direction of Direction) {
            this.neighbors[direction] = undefined;
            this.access[direction] = false;
        }
    }

    canAccess(direction) {
        return this.access[direction];
    }

    getOccupant() {
        return this.occupant;
    }

    isOccupied() {
        return this.occupant !== undefined;
    }

    removeOccupant() {
        this.occupant = undefined;
    }

    setOccupant(occupant) {
        this.occupant = occupant;
        this.occupant.setCell(this);
    }

    setLeftNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.left,
            neighbor
        });
    }

    setRightNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.right,
            neighbor
        });
    }

    setTopNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.up,
            neighbor
        });
    }

    setBottomNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.down,
            neighbor
        });
    }

    setNeighbor({
        direction,
        neighbor
    }) {
        this.neighbors[direction] = neighbor;
    }

    getNeighbor(direction) {
        return this.neighbors[direction];
    }

    getNeighbors() {
        return this.neighbors;
    }
}