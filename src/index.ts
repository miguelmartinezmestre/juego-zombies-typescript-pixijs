import * as PIXI from "pixi.js";
import Victor from "victor"

const canvasSize = 256;
const canvas = document.getElementById("game");
const app:PIXI.Application = new PIXI.Application({// @ts-ignore
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f
});

const size = 32;
const square = new PIXI.Sprite(PIXI.Texture.WHITE);
square.anchor.set(0.5);
square.position.set(app.screen.width / 2, app.screen.height / 2);
square.width = square.height = size;
square.tint = 0xea985d;

app.stage.addChild(square);

const enemyRadius = 16;
const enemySpeed = 2;
const enemy = new PIXI.Graphics();
let r = randomSpawnPoint()
enemy.position.set(r.x, r.y);
enemy.beginFill(0xFF0000, 1);
enemy.drawCircle(0,0,enemyRadius);
enemy.endFill();
app.stage.addChild(enemy)

app.ticker.add((delta:number)=>{
    const cursoPosition = app.renderer.plugins.interaction.mouse.global;
    let angle = Math.atan2(cursoPosition.y - square.position.y ,cursoPosition.x - square.position.x) + Math.PI / 2;
    square.rotation = angle;

    let e = new Victor(enemy.position.x, enemy.position.y);
    let s = new Victor(square.position.x, square.position.y);

    if (e.distance(s) < size / 2){
        let r = randomSpawnPoint();
        enemy.position.set(r.x, r.y);
        return;
    }

    let d = s.subtract(e);
    let v = d.normalize().multiplyScalar(enemySpeed);
    enemy.position.set(enemy.position.x + v.x, enemy.position.y + v.y)

})

function randomSpawnPoint() {
    let edge = Math.floor(Math.random() * 4);//[0-3]
    let spawnPoint = new Victor(0,0);
    switch (edge){
        case 0://top
            spawnPoint.x = canvasSize * Math.random();
            break;
        case 1://right
            spawnPoint.x = canvasSize;
            spawnPoint.y = canvasSize * Math.random();
            break;
        case 2://bottom
            spawnPoint.x = canvasSize * Math.random();
            spawnPoint.y = canvasSize ;
            break;
        case 3://left
            spawnPoint.y = canvasSize * Math.random();
            break;
        default:
            break;
    }
    return spawnPoint;
}