import Direction from '@enums/Direction';
import uniqid from 'uniqid';

export default class Cell {
    constructor({
        cellObject
    } = {}) {
        this.occupant = cellObject ? cellObject.occupant : undefined;
        this.neighborIds = cellObject ? cellObject.neighborIds : {}
        this.id = cellObject ? cellObject.id : uniqid();
    }

    canAccess(direction) {
        return this.neighborIds[direction] !== undefined;
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

    setLeftNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.left,
            neighborId
        });
    }

    setRightNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.right,
            neighborId
        });
    }

    setTopNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.up,
            neighborId
        });
    }

    setBottomNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.down,
            neighborId
        });
    }

    setNeighborId({
        direction,
        neighborId
    }) {
        this.neighborIds[direction] = neighborId;
    }

    removeNeighborId(direction) {
        delete this.neighborIds[direction];
    }

    getNeighborId(direction) {
        return this.neighborIds[direction];
    }

    getNeighborIds() {
        return this.neighborIds;
    }
}