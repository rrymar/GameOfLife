import {engine} from "./Engine";
import {Subscription} from "rxjs";
import {CELL_SIZE, FIELD_HEIGHT, FIELD_WIDTH} from "./DataStore";

export default class CanvasUi extends HTMLElement {
    constructor() {
        super();
    }

    dataSubscription: Subscription;
    genNumberSubscription: Subscription;

    connectedCallback() {
        const canvasWidth = FIELD_WIDTH * CELL_SIZE;
        const canvasHeight = FIELD_HEIGHT * CELL_SIZE;
        
        this.innerHTML = `<p id="genNumber"></p><canvas id="canvas" width="${canvasWidth}" height="${canvasHeight}" style="border: 1px solid black;"></canvas>`;

        const gemNumber = document.getElementById('genNumber');
        this.genNumberSubscription = engine.generationNumber.subscribe(n => {
            gemNumber.innerText = 'Generation ' + n;
        });

        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        this.dataSubscription = engine.dataStream.subscribe(data => {
            const imageData = new ImageData(data, canvasWidth, canvasHeight);
            ctx.putImageData(imageData, 0, 0);
        });

        engine.init();

        window.setInterval(() => {
            engine.next();
        }, 100);

        canvas.addEventListener('click',()=>{
            engine.next();
        });
    }

    disconnectedCallback() {
        this.dataSubscription?.unsubscribe()
    }

}

