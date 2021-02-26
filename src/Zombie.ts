import Player from "./Player";
import * as PIXI from "pixi.js";
import Victor from "victor";

export default class Zombie {
    private app: PIXI.Application;
    private player: Player;
    private readonly zombie: PIXI.Graphics;
    private readonly speed: number;
    private readonly radius: number;
    constructor({app, player}:{app:PIXI.Application, player:Player}) {
        this.app = app;
        this.player = player;

        this.radius = 16;
        this.speed = 1;
        this.zombie = new PIXI.Graphics();
        let r = this.randomSpawnPoint()
        this.zombie.position.set(r.x, r.y);
        this.zombie.beginFill(0xFF0000, 1);
        this.zombie.drawCircle(0,0,this.radius);
        this.zombie.endFill();
        app.stage.addChild( this.zombie)
    }

    public randomSpawnPoint() {
        let edge = Math.floor(Math.random() * 4);//[0-3]
        let spawnPoint = new Victor(0,0);
        let canvasSize = this.app.screen.width;
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

    public update(){
        let e = new Victor(this.zombie.position.x, this.zombie.position.y);
        let s = new Victor(this.player.position.x, this.player.position.y);
        if (e.distance(s) < this.player.size / 2){
            let r = this.randomSpawnPoint();
            this.zombie.position.set(r.x, r.y);
            return;
        }

        let d = s.subtract(e);
        let v = d.normalize().multiplyScalar(this.speed);
        this.zombie.position.set(this.zombie.position.x + v.x, this.zombie.position.y + v.y)
    }
}