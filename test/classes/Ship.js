import Shot from "./Shot";
import images from "./global";
export default class Ship {
    constructor(imgArr, x, y, scale, w, h, vx, vy) {
        this.imgArr = imgArr;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.w = w;
        this.h = h;
        this.vx = vx;
        this.vy = vy;
        this.currentSprite = this.imgArr[0];
    }
    fire() {
        new Shot(images.shotArr, 5, 0);
    }
    changeSprite() {
        this.currentSprite = this.imgArr[Math.floor(Math.random() * this.imgArr.length)];
    }
}
//# sourceMappingURL=Ship.js.map