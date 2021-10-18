import Shot from "./classes/Shot.js";
import Ship from "./classes/Ship.js";
import images from "./classes/global.js";
const canvas = document.getElementById("main");
const context = canvas.getContext("2d");
const activeObjects = [];
console.log(typeof Shot);
const randomElementOfArray = (arr) => arr[Math.floor(Math.random() * (arr.length))];
const ship = new Ship(images.shipArr, 0, 0, 4, 16, 32, 20, 20);
const keyDict = {
    "ArrowUp": () => { ship.y -= ship.vy; },
    "ArrowLeft": () => { ship.x -= ship.vx; },
    "ArrowDown": () => { ship.y += ship.vy; },
    "ArrowRight": () => { ship.x += ship.vx; },
    "w": () => { ship.y -= ship.vx; },
    "a": () => { ship.x -= ship.vx; },
    "s": () => { ship.y += ship.vy; },
    "d": () => { ship.x += ship.vx; },
    " ": ship.fire
};
document.addEventListener("keydown", (ev) => {
    var _a;
    let k = ev.key;
    (_a = keyDict[k]) === null || _a === void 0 ? void 0 : _a.call(keyDict);
    ship.changeSprite();
});
function drawShip(context) {
    context.drawImage(ship.currentSprite, ship.x, ship.y, ship.scale * ship.w, ship.scale * ship.h);
}
function tick() {
    context.clearRect(0, 0, 1000, 1000);
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 1000, 1000);
    context.fillStyle = "#000";
    drawShip(context);
}
setInterval(tick, 10);
//# sourceMappingURL=main.js.map
