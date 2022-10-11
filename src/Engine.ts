import {BehaviorSubject, Subject} from "rxjs";
import {FIELD_HEIGHT, FIELD_WIDTH} from "./consts";
import {CellType} from "./CellType";

const COLOR_SIZE: number = 4;
const INIT_FULFILLMENT: number = 0.05;

class Engine {
    generationNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    dataStream: Subject<Uint8ClampedArray> = new Subject<Uint8ClampedArray>();

    data: Uint8ClampedArray = new Uint8ClampedArray(FIELD_HEIGHT * FIELD_WIDTH * COLOR_SIZE);

    constructor() {

    }

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
        this.generationNumber.next(this.generationNumber.value + 1);
        this.streamData();
    }

    private streamData() {
        this.dataStream.next(this.data);
    }

    private setCell(x: number, y: number, type: CellType) {
        const offset = y * (FIELD_WIDTH * COLOR_SIZE) + x * COLOR_SIZE;
        switch (type) {
            case CellType.Empty:
                this.data[offset] = 0;
                this.data[offset + 1] = 0;
                this.data[offset + 2] = 0;
                this.data[offset + 3] = 0;
                break;
            case CellType.Alive:
                this.data[offset] = 0;
                this.data[offset + 1] = 0;
                this.data[offset + 2] = 0;
                this.data[offset + 3] = 255;
                break;
            case CellType.Dead:
                this.data[offset] = 0;
                this.data[offset + 1] = 0;
                this.data[offset + 2] = 0;
                this.data[offset + 3] = 10;
                break;
        }
    }

}

export const engine = new Engine();