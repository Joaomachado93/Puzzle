const bg = require("../sprites/bg.png");

export class Loader {
    constructor(loader) {
        this.loader = loader;
    }

    preload() {
        this.loader.add("bg", bg);
        this.loader.load((loader, resources) => {
            console.log(resources);
        });
    }
}