﻿import {FIELD_HEIGHT, FIELD_WIDTH} from "./consts";
import {engine} from "./Engine";
import {Subscription} from "rxjs";
import {CellType} from "./CellType";

export default class CanvasUi extends HTMLElement {
    constructor() {
        super();
    }

    dataSubscription: Subscription;
    genNumberSubscription: Subscription;

    connectedCallback() {
        this.innerHTML = `<p id="genNumber"></p><canvas id="canvas" width="${FIELD_WIDTH}" height="${FIELD_HEIGHT}" style="border: 1px solid black;"></canvas>`;

        const gemNumber = document.getElementById('genNumber');
        this.genNumberSubscription = engine.generationNumber.subscribe(n=>{
           gemNumber.innerText = 'Generation ' + n; 
        });

        const canvas = <HTMLCanvasElement>document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        this.dataSubscription = engine.dataStream.subscribe(data => {
            const imageData = new ImageData(data, FIELD_WIDTH, FIELD_HEIGHT);
            ctx.putImageData(imageData, 0, 0);
        });

        engine.init();
    }

    disconnectedCallback() {
        this.dataSubscription?.unsubscribe()
    }

}

