// Nathan Altice
// Scenester Project
// Demonstrates Phaser Scene transitions
// Created: ??/??/20
// Updated: 5/9/21

// Scene A
class SceneA extends Phaser.Scene {
    constructor() {
        super("sceneA");
    }

    create() {
        // add text
        this.add.text(64, 64, "Scene A: Click Anywhere to Switch Scenes");
        this.add.text(64, 96, "Clicks: " + clicks);

        // create rectangles
        this.rect01 = this.add.rectangle(config.width/2, config.height/2, 64, 64, 0xFACADE);
        this.rect02 = this.add.rectangle(config.width/2, config.height/2, 64, 64, 0x00FF00);

        // timer
        let timeCount = 0;
        let timerText = this.add.text(64, 182, `Scene A Time: ${timeCount}`);
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function() {
                timeCount++;
                timerText.text = `Scene A Time: ${timeCount}`;
            }
        });

        // create pointer (mouse/touch) and pointer event
        let pointer = this.input.activePointer;
        this.input.on('pointerdown', (pointer) => {
            clicks++;
            this.scene.start("sceneB");
        })
    }

    update() {
        // rotate rectangles
        this.rect01.angle += 0.1;
        this.rect02.angle -= 0.3;
    }
}

// Scene B
let sceneBconfig = {
    key: "sceneB",
    cameras: {
        backgroundColor: "0xFACADE",
    }
}

class SceneB extends Phaser.Scene {
    constructor() {
        super(sceneBconfig);
    }

    create() {
        console.log(this);
        // add text
        this.add.text(64, 64, "Scene B: Click Anywhere to Switch Scenes");
        this.add.text(64, 96, "Clicks: " + clicks);

        // create rectangles
        this.rect01 = this.add.rectangle(400, 400, 32, 32, 0xDD00BB);
        this.rect02 = this.add.rectangle(400, 300, 32, 32, 0xFFAA11);

        // timer
        let timeCount = 0;
        let timerText = this.add.text(64, 214, `Scene B Time: ${timeCount}`);
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function() {
                timeCount++;
                timerText.text = `Scene B Time: ${timeCount}`;
            }
        });

        // create pointer (mouse/touch) and pointer event
        let pointer = this.input.activePointer;
        this.input.on('pointerdown', (pointer) => {
            clicks++;           // update click counter
            this.scene.transition({
                target: "sceneC",
                duration: 3000,
            });
        })
    }

    update() {
        // rotate rectangles
        this.rect01.angle += 0.5;
        this.rect02.angle -= 0.9;
    }
}

// Scene C
class SceneC extends Phaser.Scene {
    constructor() {
        super("sceneC");
    }

    create() {
        // add text
        this.add.text(64, 128, "Scene C: Click Anywhere to Switch Scenes");
        this.add.text(64, 150, "Clicks: " + clicks);

        // create rectangles
        this.rect01 = this.add.rectangle(100, 400, 64, 64, 0x12BB77);
        this.rect02 = this.add.rectangle(100, 400, 64, 64, 0xBB7799);

        // timer
        let timeCount = 0;
        let timerText = this.add.text(64, 246, `Scene C Time: ${timeCount}`);
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function() {
                timeCount++;
                timerText.text = `Scene C Time: ${timeCount}`;
            }
        });

        // create pointer (mouse/touch) and pointer event
        let pointer = this.input.activePointer;
        this.input.on('pointerdown', (pointer) => {
            clicks++;
            this.scene.start("sceneA");
        })
    }

    update() {
        // rotate rectangles
        this.rect01.angle += 0.5;
        this.rect02.angle -= 0.9;
    }
}

// configure and create game
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ SceneA, SceneB, SceneC ],
}

let game = new Phaser.Game(config);

let clicks = 0;