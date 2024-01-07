const spells = ['jb2a.eldritch_blast.dark_green',
                'jb2a.eldritch_blast.dark_purple',
                'jb2a.eldritch_blast.dark_red',
                'jb2a.eldritch_blast.green',
                'jb2a.eldritch_blast.lightblue',
                'jb2a.eldritch_blast.lightgreen',
                'jb2a.eldritch_blast.orange',
                'jb2a.eldritch_blast.pink',
                'jb2a.eldritch_blast.purple',
                'jb2a.eldritch_blast.rainbow',
                'jb2a.eldritch_blast.yellow']

var options = "";
spells.forEach((name) => {
  options = options + `<option value="${name}"><p name="${name}">${name}</p></option>`;
});

const id = await Dialog.prompt({
  title: "Choose item",
  rejectClose: false,
  content: `
  <form>
    <div class="form-group">
      <div class="form-fields">
        <select>${options}</select>
      </div>
    </div>
  </form>`,
  label: "Select",
  callback: spawn
});

async function spawn(html){
  const id = (html[0].querySelector("select").value);
  let config = {
      size: .5,
      icon: 'ddb-images/other/spell-evocation.png',
      label: 'Ray',
      tag: 'fire',
      t: 'circle',
      drawIcon: true,
      drawOutline: true,
      interval: -1,
      rememberControlled: true,
  }

  let position = await warpgate.crosshairs.show(config);
  
  new Sequence()
  .effect()
      .file(id)
      .atLocation(token)
      .stretchTo(position)
  .play()
}
