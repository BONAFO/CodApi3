const game_selected = games.filter(g => g.folder == sessionStorage.getItem("game"))[0];
document.title = `Weapons - ${game_selected.name}`;
const weapons = game_selected.weapons;

const weapons_clas = Object.keys(weapons).map((k) => {

    const container = document.getElementById("cont");

    const div = cre("div", {
        backgroundImage: `url('../DB/${game_selected.folder}/${k.toUpperCase()}/${weapons[k][1].img}.bmp')`,
        backgroundPosition: "center",
        backgroundSize: "45% 100%",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transition",
    }, { class: "gm-cont" })

    const h3 = cre("h3", { zIndex: "10000", textAlign: "center", transform: "translateY(22vh)", color: "red" });
    h3.textContent = weapons[k][0].toUpperCase();
    container.append(div)
    div.append(h3)
    div.onclick = () => {
        sessionStorage.setItem("weapons", k.toUpperCase())
        window.location.href = "./weapons.html";
    }
});


// let envet = 'click';

// document.getElementById("btn")[`on${envet}`] = () => {
//     alert(123)
// }