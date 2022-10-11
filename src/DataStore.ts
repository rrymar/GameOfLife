import {CellType} from "./CellType";

const COLOR_SIZE: number = 4;
const DEAD_ALFA_NUM = 10;
const ALIVE_ALFA_NUM = 255;

export const FIELD_WIDTH : number = 800;
export const FIELD_HEIGHT : number = 400;

export default class DataStore {
    data: Uint8ClampedArray = new Uint8ClampedArray(FIELD_HEIGHT * FIELD_WIDTH * COLOR_SIZE);

    getCell(x: number, y: number): CellType {
        const offset = this.getOffset(x, y);
        switch (this.data[offset + 3]) {
            case ALIVE_ALFA_NUM:
                return CellType.Alive;
            case DEAD_ALFA_NUM:
                return CellType.Dead;
        }
    }
    
    setCell(x: number, y: number, type: CellType) {
        const offset = this.getOffset(x, y);
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

    private getOffset(x: number, y: number): number {
        return y * (FIELD_WIDTH * COLOR_SIZE) + x * COLOR_SIZE;
    }
}