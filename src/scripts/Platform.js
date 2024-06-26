import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

const TileSize = 64;

export class Platform {
    constructor(rows, cols, x) {

        this.dx = -5;

        this.rows = rows;
        this.cols = cols;

        this.width = cols * TileSize;
        this.height = rows * TileSize;

        this.createContainer(x);
        this.createTiles();
    }

    checkCollision(hero) {
        if (this.isCollideTop(hero)) {
            hero.stayOnPlatform(this);
        } else {
            if (hero.platform === this) {
                hero.platform = null;
            }

            if (this.isCollideLeft(hero)) {
                hero.moveByPlatform(this);
            }
        }
    }

    isCollideTop(hero) {
        return hero.right >= this.left &&
            hero.left <= this.right &&
            hero.bottom <= this.top &&
            hero.nextbottom >= this.top;
    }

    isCollideLeft(hero) {
        return hero.bottom >= this.top &&
            hero.top <= this.bottom &&
            hero.right <= this.left && 
            hero.right >= this.nextleft;
    }

    get nextleft() {
        return this.left + this.dx;
    }

    get left() {
        return this.container.x;
    }

    get right() {
        return this.left + this.width;
    }

    get top() {
        return this.container.y;
    }

    get bottom() {
        return this.top + this.height;
    }

    createContainer(x) {
        this.container = new PIXI.Container();
        this.container.x = x;
        this.container.y = window.innerHeight - this.rows * TileSize;
    }

    createTiles() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createTile(row, col);
            }
        }
    }

    createTile(row, col) {
        const texture = row === 0 ? "platform" : "tile" 
        const tile = new PIXI.Sprite(Globals.resources[texture].texture);
        this.container.addChild(tile);
        tile.x = col * tile.width;
        tile.y = row * tile.height;

    }

    move() {
        this.container.x += this.dx;

        if (this.right < 0) {
            this.container.emit("hidden");
        }
    }

}