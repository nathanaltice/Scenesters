class Pause extends Phaser.Scene {
    constructor() {
        super({ key: 'pauseScene' })
    }

    create() {
        let pauseButton = new Button(centerX, height - 64, '(P)ause', this, () => {
            // .resume will start the update loop of the target scene again
            // .stop will shutdown this scene, clear its display list, timers, etc.
            this.scene.resume('playScene').stop()
        })

        // input
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            // same as above
            this.scene.resume('playScene').stop()
        }
    }
}