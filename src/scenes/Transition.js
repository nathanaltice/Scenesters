class Transition extends Phaser.Scene {
    constructor() {
        super({ key: "transitionScene" })
    }

    create() {
        // debug
        console.log(this)

        // camera fade in effect
        this.cameras.main.fadeIn(SCENE_TRANSITION_TIME, 0, 255)
        
        // add text
        this.add.text(64, height - 64, "Transition Scene: click to .switch() to Play")

        // create rectangles
        this.rect01 = this.add.rectangle(400, 300, 32, 32, 0xDD00BB)
        this.rect02 = this.add.rectangle(400, 300, 32, 32, 0xFFAA11)

        // timer
        let timeCount = 0
        let timerText = this.add.text(64, height - 32, `Scene Time: ${timeCount}`)
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function() {
                timeCount++
                timerText.text = `Scene Time: ${timeCount}`
            }
        })

        let pointer = this.input.activePointer
        this.input.on('pointerdown', (pointer) => {
            // .switch puts this scene to sleep and starts the target scene
            this.scene.switch("playScene")
        })
    }

    update() {
        // rotate rectangles
        this.rect01.angle += 0.5
        this.rect02.angle -= 0.9
    }
}