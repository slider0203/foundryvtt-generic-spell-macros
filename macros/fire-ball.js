let config = {
    size: 8,
    icon: 'tokens/spells/fire-circle.png',
    label: 'Fireball',
    tag: 'fire',
    t: 'circle',
    drawIcon: true,
    drawOutline: true,
    interval: 2,
    rememberControlled: true,
}

let position = await warpgate.crosshairs.show(config);

new Sequence()
.effect()
    .file("jb2a.fireball.beam.orange")
    .atLocation(token)
    .stretchTo(position)
.effect()
    .file("jb2a.fireball.explosion.orange")
    .atLocation(position)
    .elevation(token.data.elevation)
    .scale(1.25)
    .delay(2100)
.play()

let templateData = {
    t: "circle",
    user: game.user._id,
    x: position.x,
    y: position.y,
    direction: 0,
    distance: 20,
    texture: "tokens/spells/fire-circle.png",
    flags: {
        alpha: .3
    }
};

let theTemplate= await MeasuredTemplateDocument.create(templateData, {parent: canvas.scene});
