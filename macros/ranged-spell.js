const spell = "jb2a.eldritch_blast.purple";

let targets = Array.from(game.user.targets);

function playEffect(start, target) {
    let center = canvas.grid.getCenter(target.x, target.y);

    new Sequence()
        .effect()
        .file(spell)
        .atLocation(start)
        .stretchTo({
            x: center[0],
            y: center[1]
        })
        .play();
}

function getLocation(event) {
    let position = event.data.getLocalPosition(canvas.stage);
    canvas.stage.off("mousedown", getLocation);
    playEffect(canvas.tokens.controlled[0].center, position);
}

if (targets.length <= 0) {
    ui.notifications.info("Click your target to attack.");
    canvas.stage.on("mousedown", getLocation);
}
else {
    var i = 0;

    (function playEffectToTarget() {
        setTimeout(function() {
            playEffect(canvas.tokens.controlled[0].center, {x: targets[i].data.x+30, y: targets[i].data.y+30})
            i++;
            if (i < targets.length) {
                playEffectToTarget();
            }
        }, 500);
    })();
}