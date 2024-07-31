const { log } = require("console");
const { writeFileSync } = require("fs");


const update_individual_manfiest = (context) => {
    writeFileSync(context.uri + "manifiest.json", JSON.stringify(context.data))
}

const update_game_context = (context) => {
    const context_url = context.game.uri;
    let file = ``;

    file += `const ${context.game.name}_weapons ={\n`;


    context.weapons.map(we => {
        file += `"${we.name.toLowerCase()}" : ${JSON.stringify(we.data)} ,\n`
    })

    file += `\n};`

    writeFileSync(context_url + "manifiest.js", file)

}



module.exports = {
    update_game_context,
    update_individual_manfiest
};