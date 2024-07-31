games.map(g => {
    console.log(g);
    const container = document.getElementById("cont");
    const div = cre('div', {
        backgroundImage: `url('${g.img}')`
    }, { class: "gm-cont" })
    container.append(div)
    div.onclick = () => {
        sessionStorage.setItem("game", g.folder)
        window.location.href = "./game.html";
    }
})