const fs = require("fs");
const path = require("path");
const { getContext } = require("../Utils/context_api");
const { log } = require("console");
const { update_game_context, update_individual_manfiest } = require("../Utils/context_update");

const path_main = path.join(__dirname, '../DB/');
const usuario = "bruno";
const folders_to_search = [
    `C:/Users/${usuario}/Downloads/`
];

const extension = ".json";

const filename = 'api_call_of_duty_01';

const parse_data_to_text = () => {
    let db_file = `const data =[ \n`
    data.map((d) => {
        let txt = "{"
        Object.keys(d).map(k => {
            txt += `"${k}"  : "${d[k]}",`;
        })
        txt += "},\n";

        db_file += txt
    })
    db_file += `];


try {
module.exports = {
    data
};
} catch (error) {

}

`;


    return db_file



}

(async() => {
    let newdata = undefined;
    for (let i = 0; i < folders_to_search.length; i++) {
        const url = folders_to_search[i] + filename + extension;
        try {
            const file = fs.readFileSync(url);
            newdata = JSON.parse(file.toString());
        } catch (error) {
            console.log(error.errno);
        }

    }

    const context = getContext();

    newdata.map(game => {
        const insidecontext = context.filter(c => c.game.name == game.game)[0];
        game.weapons.map(we => {
            const clas = insidecontext.weapons.findIndex(w => w.name == we.we)
            const item = insidecontext.weapons[clas].data.findIndex(w => we.id == w.id)
            insidecontext.weapons[clas].data[item].exp = we.exp;
            update_individual_manfiest(insidecontext.weapons[clas])
        });

        // update_game_context(insidecontext)

    })

    const newContext = getContext();

    newContext.map(cont => {
        update_game_context(cont)

    })


    // newdata.map(d => {
    //     let index = -1;
    //     const found = data.filter((dt, i) => (dt.id == d.id) ? (index = i) : (""))[0];

    //     if (index != -1) {
    //         data[index] = d;
    //     }


    //     fs.writeFileSync(path_main + 'cars/' + d.name + "/init.json", JSON.stringify(d));
    // })

    // fs.writeFileSync(path_main + "db.cars.js", parse_data_to_text())



})()