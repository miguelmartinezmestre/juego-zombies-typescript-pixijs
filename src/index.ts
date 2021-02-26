import * as PIXI from "pixi.js";
import Victor from "victor"
import Player from "./Player";
import Zombie from "./Zombie";
import Spawner from "./Spawner";

const canvasSize = 512;
const canvas = document.getElementById("game");
export const app:PIXI.Application = new PIXI.Application({// @ts-ignore
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f
});

let player = new Player({app});
let zSpawner = new Spawner({create:()=>new Zombie({app, player})});

app.ticker.add((delta:number)=>{
    player.update();
    zSpawner.spawns.forEach(zombie => zombie.update())
})

