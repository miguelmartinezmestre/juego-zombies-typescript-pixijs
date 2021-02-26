export default class Spawner {
    private spawnInterval: number;
    private maxSpawns: number;
    private create: Function;
    public spawns: any[];
    constructor({create}:{create:Function}) {
        this.spawnInterval = 1000;
        this.maxSpawns = 3;
        this.create = create;
        this.spawns = []
        setInterval(()=>this.spawn(),this.spawnInterval)
    }
    private spawn(){
        if (this.spawns.length >= this.maxSpawns) return;
        let s = this.create();
        this.spawns.push(s);

    }
}