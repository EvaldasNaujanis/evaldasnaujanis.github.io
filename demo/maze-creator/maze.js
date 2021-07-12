class Maze {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.current = null;

        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.grid.push(new Cell(col, row));
            }
        }
    }

    static random(max) {
        return Math.floor(Math.random() * max);
    }

    getIndex(x, y) {
        return y * this.width + x;
    }

    /**
     * Generating maze using Recursive Backtracker algorithm.
     * @returns {Array} of maze cells
     * @memberof module:maze
     */
    generate() {
        let stack = [];
        this.grid = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                this.grid.push(new Cell(col, row));
            }
        }

        console.log('creating maze ', this.grid);

        this.current = this.grid[0];
        // this.current.markVisited();

        let isGenerating = true;
        while (isGenerating) {
            this.current.markVisited();
            let next = this.getNextNeighbor();
            if (next !== undefined) {
                // Push the current cell to the stack
                stack.push(this.current);

                // Remove the wall between the current cell and the chosen neighbor cell
                Maze.removeWalls(this.current, next);

                this.current = next;

                console.log(this.current);
            }
            else if (stack.length > 0) {
                // if current cell reached deadend - pop from stack and explore other ways
                console.log(`stack size: ${stack.length}`);
                this.current = stack.pop();
            }
            else {
                isGenerating = false;
            }
        }

        return this.grid;
    }

    getNextNeighbor() {
        let neighbors = [];
        for (let j = this.current.row - 1; j <= this.current.row + 1; j++)
            for (let i = this.current.col - 1; i <= this.current.col + 1; i++)
            {
                if (j < 0 || j == this.height || i < 0  || i == this.width)
                    continue;
    
                if (j == this.current.row && i == this.current.col)
                    continue;
    
                if (j != this.current.row && i != this.current.col)
                    continue;
    
                let index = this.getIndex(i, j);
                if (this.grid[index] !== undefined && !this.grid[index].isVisited)
                    neighbors.push(this.grid[index]);
            }
    
        console.log(this.current, ` has ${neighbors.length} neighbors`);

        if (neighbors.length > 0)
            return neighbors[Maze.random(neighbors.length)];
    
        return undefined;
    }

    
    /**
     * Remove walls between neighboring cells (does not check if cells are adjacent).
     * @param {Cell} a first cell.
     * @param {Cell} b second cell.
     * @return {void} void.
     * @memberOf module:maze
     */
    static removeWalls(a, b) {
        let deltaX = a.col - b.col;
        let deltaY = a.row - b.row;
        if (deltaX === -1) {
            a.walls[1] = false;
            b.walls[3] = false;
        } else if (deltaX === 1) {
            a.walls[3] = false;
            b.walls[1] = false;
        }

        if (deltaY === -1) {
            a.walls[2] = false;
            b.walls[0] = false;
        } else if (deltaY === 1) {
            a.walls[0] = false;
            b.walls[2] = false;
        }
    }

}
