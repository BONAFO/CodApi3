const fs = require("fs");
const path = require("path");
const path_main = path.join(__dirname, '../DB/');

const get_games = () => {
    const games = fs.readdirSync(path_main);

    const folders = [];

    const exceptions = [];
    games.map(g => {
        const stats = fs.statSync(path_main + g);
        if (stats.isDirectory() && exceptions.indexOf(g) == -1) {
            folders.push(g)
        }
    })

    return folders
}

const get_classes_weapons = (uri) => {
    const classes = fs.readdirSync(uri);

    const folders = [];

    const exceptions = ['ATT'];
    classes.map(c => {
        const stats = fs.statSync(uri + c);
        if (stats.isDirectory() && exceptions.indexOf(c) == -1) {
            folders.push(c)
        }
    })

    return folders
}

const getContext = () => {
    const games = get_games();
    const context = [];
    games.map(g => {
        const context_inside = {};
        context_inside.game = {};
        context_inside.weapons = [];

        const gameuri = path.join(path_main, '/' + g + "/");

        const weapons = get_classes_weapons(gameuri);

        context_inside.game.name = g;
        context_inside.game.uri = gameuri;

        weapons.map(w => {
            const weaponuri = path.join(gameuri, '/' + w + "/");

            const manifiest = JSON.parse(fs.readFileSync(weaponuri + "manifiest.json").toString());

            context_inside.weapons.push({ name: w, uri: weaponuri, data: manifiest })

        })

        context.push(context_inside)
    })


    return context
}

module.exports = {
    getContext
}