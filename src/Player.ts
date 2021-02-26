import * as PIXI from "pixi.js";

export default class Player {
    private app: PIXI.Application;
    private readonly player: PIXI.Sprite;
    public size: number;
    public position: PIXI.ObservablePoint;
    constructor({app}:{app:PIXI.Application}) {
        this.size = 32;
        this.app = app;
        this.player = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.player.anchor.set(0.5);
        this.position = this.player.position;
        this.player.position.set(app.screen.width / 2, app.screen.height / 2);
        this.player.width = this.size;
        this.player.height = this.size;
        this.player.tint = 0xea985d;

        app.stage.addChild(this.player);
    }
    public update(){
        const cursorPosition = this.app.renderer.plugins.interaction.mouse.global;
        this.player.rotation = Math.atan2(cursorPosition.y - this.player.position.y, cursorPosition.x - this.player.position.x) + Math.PI / 2;
    }
}