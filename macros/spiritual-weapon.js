const pack = game.packs.get("jb2a_patreon.jb2a-actors");
const options = Array.from(pack.index).filter(i => i.name.includes('Spiritual Weapon')).reduce((acc, {name, _id}) => {
    return acc + `<option value="${_id}"><p name="${name}">${name}</p></option>`;
}, "");

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
    const id = (html[0].querySelector("select").value)
    const doc = await pack.getDocument(id);
    if(!game.actors.getName(doc.name)){
        let myFolder= game.folders.filter(f => f.name === 'TEMP')[0] ?? await Folder.create({
            name: 'TEMP',
            type: 'Actor'
        });
        let myFolderID = myFolder.id;
        await game.actors.importFromCompendium(pack, id, {folder: myFolderID})
    }
    await warpgate.spawn(doc.name);
}
