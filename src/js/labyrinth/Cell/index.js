import Direction from '@enums/Direction';
import uniqid from 'uniqid';

export default class Cell {
    constructor({
        cellObject = {}
    } = {}) {
        const {
            _id = uniqid(),
            _occupantId,
            _neighborIds = {}
        } = cellObject;

        this._occupantId = _occupantId;
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

    get occupantId() {
        return this._occupantId;
    }

    set occupantId(occupantId) {
        this._occupantId = occupantId;

        if (this.isOccupied) {
            this._numVisits++;
        }
    }

    get isOccupied() {
        return this.occupantId !== undefined;
    }

    removeOccupant() {
        this.occupantId = undefined;
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
