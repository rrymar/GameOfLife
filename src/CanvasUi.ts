export default class CanvasUi extends HTMLElement {
    constructor() {
       super();
    }

    connectedCallback() {
        this.innerHTML = '<canvas id="canvas" width="800" height="400" style="border: 1px solid black;"></canvas>';
    }
    
}

