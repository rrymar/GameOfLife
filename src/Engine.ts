import {BehaviorSubject, Subject} from "rxjs";
import {CellType} from "./CellType";
import DataStore, {FIELD_HEIGHT, FIELD_WIDTH} from "./DataStore";

const INIT_FULFILLMENT: number = 0.15;

class Engine {
    generationNumber: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    dataStream: Subject<Uint8ClampedArray> = new Subject<Uint8ClampedArray>();

    store: DataStore = new DataStore();
    nextGenStore: DataStore;
    
    init() {

        for (let x = 0; x < FIELD_WIDTH; x++) {
            for (let y = 0; y < FIELD_HEIGHT; y++) {
                const type: CellType = Math.floor(Math.random() * (1 + INIT_FULFILLMENT));
                this.store.setCell(x, y, type);
            }
        }
        this.streamData();
    }

    next() {
        this.nextGenStore = new DataStore(this.store);
        for (let x = 0; x < FIELD_WIDTH; x++) {
            for (let y = 0; y < FIELD_HEIGHT; y++) {
                const cell = this.store.getCell(x, y);

                const aliveSublings = this.getAliveSublingsNumber(x, y);
                if (cell == CellType.Alive) {
                    if (aliveSublings > 3 || aliveSublings < 2)
                        this.nextGenStore.setCell(x, y, CellType.Dead);
                } else {
                    if (aliveSublings === 3)
                        this.nextGenStore.setCell(x, y, CellType.Alive);
                }
            }
        }

        this.store = this.nextGenStore;
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
                
                if (this.store.getCell(newX, newY) === CellType.Alive)
                    toReturn++;
            }
        }

        return toReturn;
    }

    private streamData() {
        this.generationNumber.next(this.generationNumber.value + 1);
        this.dataStream.next(this.store.data);
    }

}

export const engine = new Engine();