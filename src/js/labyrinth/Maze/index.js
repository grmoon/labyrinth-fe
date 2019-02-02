import Direction from '@enums/Direction';
import Grid from "@labyrinth/Grid";

function getRandomIntInRange(min, max) {
    const _min = Math.ceil(min);
    const _max = Math.floor(max);

    return Math.floor(Math.random() * (_max - _min)) + _min;
}

export default class Maze extends Grid {
    constructor({
        mazeObject,
        numCols,
        numRows
    }) {
        super({
            gridObject: mazeObject,
            numCols,
            numRows
        });

        if (mazeObject) {
            this._end = this._cellsById.get(mazeObject._end._id);
            this._start = this._cellsById.get(mazeObject._start._id);
        }
        else {
            this.selectEnd();
            this.buildMaze();
            this.selectStart();
        }
    }

    get end() {
        return this._end;
    }

    get start() {
        return this._start;
    }

    selectStart() {
        this.distancesFromEnd = this.findDistancesFrom(this._end);
        let maxDist = Number.MIN_SAFE_INTEGER;
        this.cellsByDistanceFromEnd = new Map();

        this.distancesFromEnd.forEach((dist, cell) => {
            if (dist > maxDist) {
                maxDist = dist;
            }

            if (this.cellsByDistanceFromEnd[dist] === undefined) {
                this.cellsByDistanceFromEnd.set(dist, []);
            }

            this.cellsByDistanceFromEnd.get(dist).push(cell);
        });

        this._start = this.cellsByDistanceFromEnd.get(maxDist)[0];
    }

    selectEnd() {
        const endRow = getRandomIntInRange(0, this.numRows);
        const endCol = getRandomIntInRange(0, this.numCols);

        this._end = this.get(endRow, endCol);
    }

    buildMaze() {
        const path = [this._end];
        const cells = [this._end];
        const visited = [this._end.id];
        const cellAccess = new Map();

        while (cells.length > 0) {
            const cell = cells.pop();
            const neighborIds = cell.neighborIds;
            const unvisitedNeighborDirections = [];

            for (let direction in neighborIds) {
                const neighborId = neighborIds[direction];

                if (!visited.includes(neighborId)) {
                    unvisitedNeighborDirections.push(direction);
                }
            }

            if (unvisitedNeighborDirections.length === 0) {
                if (path.length > 0) {
                    cells.push(path.pop());
                }

                continue;
            }

            const randIdx = getRandomIntInRange(0, unvisitedNeighborDirections.length);
            const direction = unvisitedNeighborDirections[randIdx];
            const oppositeDirection = Direction.opposite(direction);
            const neighbor = this.getNeighbor(cell, direction);

            if (!cellAccess.has(neighbor)) {
                cellAccess.set(neighbor, {});
            }

            const neighborCellAccess = cellAccess.get(neighbor);

            if (!cellAccess.has(cell)) {
                cellAccess.set(cell, {});
            }

            const currentCellAccess = cellAccess.get(cell);

            neighborCellAccess[oppositeDirection] = true;
            currentCellAccess[direction] = true;

            visited.push(neighbor.id);
            cells.push(neighbor);
            path.push(neighbor);
        }

        cellAccess.forEach((access, cell) => {
            for (let direction in cell.neighborIds) {
                if (!access[direction]) {
                    cell.removeNeighborId(direction);
                }
            }
        });
    }

    findDistancesFrom(source) {
        const dist = new Map();
        const cells = [];

        this.forEach(cell => {
            cells.push(cell);
            dist.set(cell, Number.MAX_SAFE_INTEGER);
        });

        dist.set(source, 0);

        while (cells.length > 0) {
            let cell;

            dist.forEach((cellDist, _cell) => {
                if (
                    cells.includes(_cell) &&
                    (cell === undefined || cellDist < dist.get(cell))
                ) {
                    cell = _cell;
                }
            });

            const cellIdx = cells.indexOf(cell);
            cells.splice(cellIdx, 1);

            const neighbors = this.getNeighbors(cell);

            for (let direction in neighbors) {
                if (!cell.canAccess(direction)) {
                    continue;
                }
                const neighbor = neighbors[direction];
                const alt = dist.get(cell) + 1;

                if (alt < dist.get(neighbor)) {
                    dist.set(neighbor, alt);
                }
            }
        }

        return dist;
    }
}