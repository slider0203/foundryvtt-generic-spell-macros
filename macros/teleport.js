const spell = ["jb2a.misty_step.01.blue", "jb2a.misty_step.02.blue"]

function playEffect(position) {
    let tokenD = canvas.tokens.controlled[0];
    let snapPosition = canvas.grid.getTopLeft(position.x, position.y);
    let center = canvas.grid.getCenter(position.x, position.y);

    new Sequence()
        .effect()
            .file(spell[0])
            .atLocation(tokenD)
            .scale(0.35)
        .wait(1000)
        .effect()
        .file(spell[1])
        .atLocation({
            x: center[0],
            y: center[1]
        })
        .scale(0.5)
        .animation()
            .on(tokenD)
            .opacity(0)
        .animation()
            .on(tokenD)
            .teleportTo({
                x: snapPosition[0],
                y: snapPosition[1]
            })
        .animation()
        .on(tokenD)
        .opacity(1)
        .delay(1800)
        .play();
}

function getLocation(event) {
    let position = event.data.getLocalPosition(canvas.stage);
    canvas.stage.off("mousedown", getLocation);
    playEffect(position);
}

ui.notifications.info("Click your target location.");
canvas.stage.on("mousedown", getLocation);