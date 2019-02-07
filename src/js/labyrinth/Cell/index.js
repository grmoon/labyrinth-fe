import Direction from '@enums/Direction';
import uniqid from 'uniqid';

export default class Cell {
    constructor({
        cellObject = {}
    } = {}) {
        const {
            _id = uniqid(),
            _occupant,
            _neighborIds = {}
        } = cellObject;

        this._occupant = _occupant;
        this._neighborIds = _neighborIds;
        this._id = _id;
        this._numVisits = 0;
    }

    canAccess(direction) {
        return this._neighborIds[direction] !== undefined;
    }

    get numVisits() {
        return this._numVisits;
    }

    get id() {
        return this._id;
    }

    get occupant() {
        return this._occupant;
    }

    set occupant(occupant) {
        this._occupant = occupant;

        if (this.isOccupied) {
            this.occupant.cell = this;
            this._numVisits++;
        }
    }

    get isOccupied() {
        return this.occupant !== undefined;
    }

    removeOccupant() {
        this.occupant = undefined;
    }


    set leftNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.left,
            neighborId
        });
    }

    set rightNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.right,
            neighborId
        });
    }

    set topNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.up,
            neighborId
        });
    }

    set bottomNeighborId(neighborId) {
        return this.setNeighborId({
            direction: Direction.down,
            neighborId
        });
    }

    setNeighborId({
        direction,
        neighborId
    }) {
        this._neighborIds[direction] = neighborId;
    }

    removeNeighborId(direction) {
        return delete this._neighborIds[direction];
    }

    get neighborIds() {
        return Object.assign({}, this._neighborIds);
    }
}
