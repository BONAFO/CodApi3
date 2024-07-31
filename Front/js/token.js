const get_token = (basegame) => {
    const token = localStorage.getItem("codtemp");
    let data;
    if (token) {
        const dec = JSON.parse(unzip(token))
        data = dec.filter(d => d.game == basegame)[0];
        if (!data) {
            dec.push(create_base(basegame))
            const token_dec = zip(data);
            localStorage.setItem("codtemp", token_dec)
        }
    } else {
        data = create_base(basegame);
        const token_dec = zip([data]);
        localStorage.setItem("codtemp", token_dec)
    }

    return data
}



const create_base = (basegame) => {
    return {
        game: basegame,
        player: 0,
        weapons: []
    }

}





const exp_calculations = (exp) => {

    // const;
    const seed = 15000;
    let lv = 0;
    let total = 0;

    let exprest = exp;
    let percent = 0;




    const calcular_entero = () => {

    }



    do {

        const tolevel = calcular_decimal([seed, 'd*', lv + 1, 'pd', 'd*', .27, 'pd', 'd+', seed, 'pd', 'd/', 1.2, 'pe']);

        total = sumar_enteros(total.toString(), tolevel);


        if (compare_Bi(exp, total)) {
            lv++
            exprest = parseEntero(resta_enteros(exprest, tolevel))
        } else {
            percent = calcular_decimal(['pe', exprest, '*', '100', 'pe', '/', tolevel, 'pe'])
            break
        }


    } while (true);




    return { lv, percent }

}

// {id : 0, exp : }