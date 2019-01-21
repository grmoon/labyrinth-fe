import Direction from '@labyrinth/Direction';

export default class Cell {
    constructor() {
        this.occupant = undefined;
        this.neighbors = {}

        Object.values(Direction).forEach((direction) => {
            this.neighbors[direction] = undefined;
        });
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
            direction: Direction.LEFT,
            neighbor
        });
    }

    setRightNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.RIGHT,
            neighbor
        });
    }

    setTopNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.UP,
            neighbor
        });
    }

    setBottomNeighbor(neighbor) {
        return this.setNeighbor({
            direction: Direction.DOWN,
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
}