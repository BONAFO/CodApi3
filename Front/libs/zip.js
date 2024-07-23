const equiv = [
    { d: "name", c: "@q@" },
    { d: "race_lv", c: "@w@" },
    { d: "race_exp", c: "@e@" },
    { d: "rally_lv", c: "@r@" },
    { d: "rally_exp", c: "@t@" },
    { d: "special_lv", c: "@y@" },
    { d: "special_exp", c: "@u@" },
    { d: "money", c: "@i@" },
    { d: "Alfa Romeo", c: "@o@" },
    { d: "Aston Martin", c: "@p@" },
    { d: "Auto Union", c: "@a@" },
    { d: "Caterham Superlight", c: "@s@" },
    { d: "Chevrolet", c: "@d@" },
    { d: "Ferrari", c: "@f@" },
    { d: "Formula Drift", c: "@g@" },
    { d: "Hoonigan", c: "@h@" },
    { d: "James Bond", c: "@j@" },
    { d: "Koenigsegg", c: "@k@" },
    { d: "KTM X - Bow", c: "@l@" },
    { d: "Lamborghini", c: "@z@" },
    { d: "Land Rover", c: "@x@" },
    { d: "LEGO Speed", c: "@c@" },
    { d: "Maserati", c: "@v@" },
    { d: "McLaren", c: "@b@" },
    { d: "Mercedes - Benz", c: "@n@" },
    { d: "Mitsubishi", c: "@m@" },
    { d: "Nissan", c: "@1@" },
    { d: "Subaru", c: "@2@" },
    { d: "Vauxhall", c: "@3@" },
    { d: "Volkswagen", c: "@4@" },
    { d: "Porsche", c: "@5@" },
];


const code_equiv = (data) => {
    data = JSON.stringify(data);
    equiv.map(code => {
        data = data.replaceAll(code.d, code.c);
    })
    return data
}
const decode_equiv = (string) => {
    equiv.map(code => {
        string = string.replaceAll(code.c, code.d);
    })
    return string
}

const unzip = (zipped) => {
    let unziped = atob(zipped);
    unziped = unziped.split('').map(char => char.charCodeAt(0))
    unziped = new Uint8Array(unziped)
    unziped = pako.inflate(unziped, { to: 'string' })
    return decode_equiv(unziped)

}



const zip = (data) => {
    let coded = code_equiv(data);
    coded = pako.deflate(coded, { to: 'string' });
    return btoa(String.fromCharCode.apply(null, coded));
}


