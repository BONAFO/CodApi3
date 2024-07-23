const cre = (element = String, style = {
    width: String,
    display: String,
    position: String,
    top: String,
    left: String,
    opacity: String,
    zIndex: String,
    border: String,
    background: String,
    backgroundColor: String,
    backgroundImage: String,
    backgroundSize: String,
    backgroundPosition: String,
}, ) => {
    element = document.createElement(element);

    Object.keys(style).map(sty => {
        element.style[sty] = style[sty];
    })

    return (element)
}


console.log(cre('h3', { width: "10px" }));