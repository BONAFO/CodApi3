const game_selected = games.filter(g => g.folder == sessionStorage.getItem("game"))[0];
const weapons = game_selected.weapons[sessionStorage.getItem("weapons").toLowerCase()];
document.title = `${weapons[0]} - ${game_selected.name}`;

const attachs = game_selected["attachs"]

const save = get_token(game_selected.folder);

const get_weapon_values = (id, newexp) => {
    let found = save.weapons.filter(w => w.id == id)[0];
    if (!found) {
        found = weapons.filter(w => w.id == id)[0];
    }
    let calculation
    if (newexp) {
        found.exp = sumar_enteros(found.exp, newexp);
    }
    calculation = exp_calculations(found.exp);
    // found.exp = sumar_enteros(found.exp, value);
    // const calculation = exp_calculations(found.exp);
    return { exp: found.exp, calculation }
}


weapons.slice(1).map((we, index) => {
    const container = document.getElementById("weapons-table");
    const tr = cre("tr");
    const td1 = cre("td", { width: "25%", height: "400px" });
    const td2 = cre("td");
    const img = cre("img", {}, { class: "w-100 h-75", src: `../DB/${game_selected.folder}/${sessionStorage.getItem("weapons").toUpperCase()}/${we.img}.bmp` });

    container.append(cre("tr", { height: "1rem" }))
    container.append(tr)
    tr.append(td1, td2)
    td1.append(img)

    const weapon_stats = get_weapon_values(we.id);
    const [div, div2, div2_5, div3, div4] = [
        cre('div', { height: "calc(100% /4)", textAlign: "center", fontSize: "2rem" }, {}),
        cre('div', { height: "calc(100% /4)", transition: "width .3s", width: `${(weapon_stats.calculation) ? (90 * (weapon_stats.calculation.percent /100)) : (0)}%`, backgroundColor: "rgb(112, 226, 127)", height: "3rem", margin: "0% 5%", }, { id: `expbar-${we.id}` }),
        cre('div', { height: "calc(100% /4)", position: "relative", bottom: "3rem", width: "90%", height: "3rem", margin: "0% 5%", border: "2px solid rgb(112, 226, 127)" }, {}),
        cre('div', { height: "calc(100% /4)", width: "90%", marginLeft: "6%", wordWrap: " break-word", }, {}),
        cre('div', { height: "calc(100% /4)", width: "90%" }, { class: "text-center" }),
    ];

    td2.append(div, cre("br"), div2, div2_5, div3, div4)
    div.append(cre("label", { color: "rgb(255, 255, 255)" }, {}, { textContent: we.name.toUpperCase() }))

    we.attr.map((at, i) => {
        const ata = attachs.filter(atc => atc.id == at)[0];
        const divint = cre("div", { width: "6rem", margin: ".5rem", display: 'inline-block', filter: `${(weapon_stats.calculation && i +1 <= parseInt( weapon_stats.calculation.lv)) ?  ("grayscale(0%)"): ("grayscale(100%)")}` }, { id: `att-${i}-${we.id}` })
        divint.append(cre("img", {}, { class: "w-100", src: `../DB/${game_selected.folder}/ATT/${ata.img}.png` }));
        div3.append(divint)
    })


    const [btn_add, btn_reset] = [
        cre('button', { color: "black", fontSize: "1.5rem", margin: "3% 2%", padding: ".5% 8rem" }, { class: "btn btn-success" }, { textContent: 'ADD EXP' }),
        cre('button', { color: "black", fontSize: "1.5rem", margin: "3% 2%", padding: ".5% 8rem" }, { class: "btn btn-danger" }, { textContent: 'RESET' }),
    ];

    btn_add.onclick = () => {
        Swal.fire({
            title: "Add EXP",
            input: "number",



            customClass: {
                popup: 'sw2-popup',
                cancelButton: "btn btn-danger sw2-btn",
                confirmButton: "btn btn-success  sw2-btn",
            },
            showCancelButton: true,
            showDenyButton: false,
            showCancelButton: true,




        }).then((rest) => {
            if (rest.isConfirmed) {
                const value = (rest.value);
                if (!isNaN(value)) {
                    const weapon_stats = get_weapon_values(we.id, value);
                    for (let i = 0; i < weapon_stats.calculation.lv; i++) {
                        document.getElementById(`att-${i}-${we.id}`).style.filter = "grayscale(0%)";
                    }
                    document.getElementById(`expbar-${we.id}`).style.width = `${90 * (weapon_stats.calculation.percent /100)}%`;
                    let found = save.weapons.filter(w => w.id == we.id)[0];
                    const fullsave = JSON.parse(unzip(localStorage.getItem("codtemp")));
                    if (!found) {
                        save.weapons.push({ id: we.id, exp: weapon_stats.exp, we: sessionStorage.getItem("weapons") })
                    } else {
                        save.weapons[save.weapons.findIndex(s => s.id == we.id)].exp = weapon_stats.exp;
                    }

                    const index_fs = fullsave.findIndex(fs => fs.game == game_selected.folder);
                    fullsave[index_fs] = save;
                    const token_dec = zip(fullsave);
                    localStorage.setItem("codtemp", token_dec)
                }
            }
        });
    }



    btn_reset.onclick = () => {
        Swal.fire({
            title: "Are you sure you want to reset this weapon?",



            customClass: {
                popup: 'sw2-popup',
                cancelButton: "btn btn-danger sw2-btn",
                confirmButton: "btn btn-success  sw2-btn",
            },
            showCancelButton: true,
            showDenyButton: false,
            showCancelButton: true,


        }).then((rest) => {
            if (rest.isConfirmed) {
                let found = save.weapons.filter(w => w.id == we.id)[0];
                if (!found) {
                    save.weapons.push({ id: we.id, exp: 0, we: sessionStorage.getItem("weapons") })
                } else {
                    save.weapons[save.weapons.findIndex(s => s.id == we.id)].exp = 0;
                }

                document.getElementById(`expbar-${we.id}`).style.width = `0%`;

                for (let i = 0; i < we.attr.length - 1; i++) {
                    console.log(i);
                    document.getElementById(`att-${i}-${we.id}`).style.filter = "grayscale(100%)";
                }
                weapons[weapons.findIndex(wep => wep.id == we.id)].exp = 0;


                const fullsave = JSON.parse(unzip(localStorage.getItem("codtemp")));
                const index_fs = fullsave.findIndex(fs => fs.game == game_selected.folder);
                fullsave[index_fs] = save;
                const token_dec = zip(fullsave);
                localStorage.setItem("codtemp", token_dec)
            }
        });



    }

    div4.append(btn_add, btn_reset)
    container.append(cre("tr", { height: "1rem" }))


})


// const getIndex = (arr = [], element, propName) => {
//     if (!propName) {
//         return arr.indexOf(element)
//     } else {
//         return arr.find
//     }
// }