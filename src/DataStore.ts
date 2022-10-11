import {CellType} from "./CellType";

const COLOR_SIZE: number = 4;
const DEAD_ALFA_NUM = 10;
const ALIVE_ALFA_NUM = 255;

export const CELL_SIZE = 10;
export const FIELD_WIDTH: number = 10;
export const FIELD_HEIGHT: number = 10;

export default class DataStore {
    data: Uint8ClampedArray = new Uint8ClampedArray(FIELD_HEIGHT * FIELD_WIDTH * COLOR_SIZE * CELL_SIZE * CELL_SIZE);

    constructor(init?: DataStore) {
        if (init) this.data.set(init.data);
    }

    getCell(x: number, y: number): CellType {
        const offset = y * CELL_SIZE * (FIELD_WIDTH * COLOR_SIZE) + x * CELL_SIZE * COLOR_SIZE;
        switch (this.data[offset + 3]) {
            case ALIVE_ALFA_NUM:
                return CellType.Alive;
            case DEAD_ALFA_NUM:
                return CellType.Dead;
        }
    }

    setCell(x: number, y: number, type: CellType) {
        for (let i = 0; i < CELL_SIZE; i++) {
            for (let j = 0; j < CELL_SIZE; j++) {
                const offset = (y*CELL_SIZE + j) * (FIELD_WIDTH * CELL_SIZE * COLOR_SIZE) + (x*CELL_SIZE + i) * COLOR_SIZE;
                console.log(x + " " + " " + y + " = " + offset);
                switch (type) {
                    case CellType.Alive:
                        this.data[offset] = 0;
                        this.data[offset + 1] = 0;
                        this.data[offset + 2] = 0;
                        this.data[offset + 3] = ALIVE_ALFA_NUM;
                        break;
                    case CellType.Dead:
                        this.data[offset] = 0;
                        this.data[offset + 1] = 0;
                        this.data[offset + 2] = 0;
                        this.data[offset + 3] = DEAD_ALFA_NUM;
                        break;
                }
            }
        }
    }

    private getOffset(x: number, y: number): number {
        return y * CELL_SIZE * (FIELD_WIDTH * COLOR_SIZE) + x * CELL_SIZE * COLOR_SIZE;
    }
}