import uniqid from 'uniqid';
export default class Occupant {
    constructor({ name: _name }) {
        this._name = _name;
        this._cell = undefined;
        this._id = uniqid();
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    set cell(_cell) {
        this._cell = _cell;
    }

    get cell() {
        return this._cell;
    }

    move(direction) {
        if (!this.cell.canAccess(direction)) {
            throw new Error(`Cannot move ${direction}.`);
        }

        const neighbor = this.cell.getNeighbor(direction);

        this.cell.removeOccupant();
        neighbor.occupant = this;
    }
}