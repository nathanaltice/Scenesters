// Nathan Altice
// Scenesters Project
// Demonstrates Phaser Scene methods (launch, run, pause, resume, transition, switch, etc)
// Created: ??/??/20
// Updated: 1/13/24
// For good info on scenes, see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
// Additional info: https://github.com/jdotrjs/phaser-guides/blob/master/Basics/Part3.md

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Play, Menu, Pause, Transition ],
}

let game = new Phaser.Game(config)

let { height, width } = game.config
let centerX = width / 2
let centerY = height / 2

const SCENE_TRANSITION_TIME = 2000