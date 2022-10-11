import {BehaviorSubject, Subject} from "rxjs";
import {FIELD_HEIGHT, FIELD_WIDTH} from "./consts";
import {CellType} from "./CellType";

const COLOR_SIZE: number = 4;
const INIT_FULFILLMENT: number = 0.01;

const DEAD_ALFA_NUM = 10;
const ALIVE_ALFA_NUM = 255;

class Engine {
    generationNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    dataStream: Subject<Uint8ClampedArray> = new Subject<Uint8ClampedArray>();

    data: Uint8ClampedArray = new Uint8ClampedArray(FIELD_HEIGHT * FIELD_WIDTH * COLOR_SIZE);

    init() {
        for (let x = 0; x < FIELD_WIDTH; x++) {
            for (let y = 0; y < FIELD_HEIGHT; y++) {
                const type: CellType = Math.floor(Math.random() * (1 + INIT_FULFILLMENT));
                this.setCell(x, y, type);
            }
        }

        this.dataStream.next(this.data);
        this.streamData();
    }

    next() {

        for (let x = 0; x < FIELD_WIDTH; x++) {
            for (let y = 0; y < FIELD_HEIGHT; y++) {
                const cell = this.getCell(x, y);

                const aliveSublings = this.getAliveSublingsNumber(x, y);
                if (cell == CellType.Alive) {
                    if (aliveSublings > 4 || aliveSublings < 2)
                        this.setCell(x, y, CellType.Dead);
                } else {
                    if (aliveSublings === 3)
                        this.setCell(x, y, CellType.Alive);
                }
            }
        }

        this.streamData();
    }


    private getAliveSublingsNumber(x: number, y: number): number {
        let toReturn = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                const newX = x + i;
                const newY = y + j;
                if (newX < 0 || newY < 0 || (i == 0 && j == 0))
                    continue;
                
                if (this.getCell(newX, newY) === CellType.Alive)
                    toReturn++;
            }
        }

        return toReturn;
    }

    private streamData() {
        this.generationNumber.next(this.generationNumber.value + 1);
        this.dataStream.next(this.data);
    }

    private getCell(x: number, y: number): CellType {
        const offset = this.getOffset(x, y);
        switch (this.data[offset + 3]) {
            case ALIVE_ALFA_NUM:
                return CellType.Alive;
            case DEAD_ALFA_NUM:
                return CellType.Dead;
        }
    }

    private getOffset(x: number, y: number): number {
        return y * (FIELD_WIDTH * COLOR_SIZE) + x * COLOR_SIZE;
    }

    private setCell(x: number, y: number, type: CellType) {
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

}

export const engine = new Engine();