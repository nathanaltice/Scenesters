class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    preload() {
        this.load.path = './assets/'
        this.load.image('menu', 'menu.png')
    }

    create() {
        // add text
        this.add.text(64, 64, "Play Scene: (M)enu, (P)ause, click to .transition()")

        // create rectangles
        this.rect01 = this.add.rectangle(64, centerY, 64, 64, 0xFACADE)
        this.rect02 = this.add.rectangle(64, centerY, 64, 64, 0x00FF00)

        // timer
        let timeCount = 0
        let timerText = this.add.text(64, 96, `Scene A Time: ${timeCount}`)
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: function() {
                timeCount++
                timerText.text = `Scene A Time: ${timeCount}`
            }
        });

        // keyboard binding
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        this.menuKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M)

        // create pointer (mouse/touch) and pointer event
        let pointer = this.input.activePointer
        this.input.on('pointerdown', (pointer) => {
            // .transition will create a timed transition between scenes
            this.scene.transition({
                allowInput: false,
                target: "transitionScene",
                duration: SCENE_TRANSITION_TIME,
                onStart: () => {
                    this.cameras.main.fadeOut(SCENE_TRANSITION_TIME, 255, 0, 0)
                }
            })
        })
    }

    update() {
        // monitor for menu/pause
        if(Phaser.Input.Keyboard.JustDown(this.menuKey)) {
            if(!this.scene.isActive('menuScene')) {
                // .run will run the target scene, but not change the state of the invoking scene
                // (.run also wakes a sleeping scene)
                this.scene.run('menuScene')
            }  
        }
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            // .pause will stop the update step but still render the scene
            // .launch will launch the target scene and run it in parallel with the invoking scene
            this.scene.pause().launch('pauseScene')
        }

        // rotate rectangles
        this.rect01.angle += 0.1
        this.rect02.angle -= 0.3
    }
}