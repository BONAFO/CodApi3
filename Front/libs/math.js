//.................................... TOOLS ...............................................//

// REPITE STRINGS (USADO PARA AGREGAR 0)
const repeat = (times, string) => {
    return new Array(times + 1).join(string);
}

// INVERTIR NUMERO
const reverse_element = (e) => {
    return ((e.toString()).split("").reverse()).join("")
}

// LIMPIAR LOS 0 AL INICIO
const reemplazar_ceros = (bt) => {

    let spitto = 0;
    for (let i = 0; i < bt.length; i++) {
        if (bt[i] != 0) {
            spitto = i;
            break
        }

    }

    return bt.substring(spitto)
}

// OBTIENE LA CANTIDAD DE COMAS QUE UN NUMERO TIENE
const get_cant_comas = (num) => {
    if (num.includes(".")) {
        const i = num.indexOf('.');
        return num.substring(i + 1).length
    }

    return 0
}

// COMPARAR 2 NUMEROS SIN IMPORTAR SU TAMAÑO Y SI ES DECIMAL (NO SIRVE CON NEGATIVOS)
const compare_Bi = (bt1, bt2) => {
    bt1 = bt1.toString()
    bt2 = bt2.toString()
    let sondecimales = [bt1.includes("."), bt2.includes('.')];


    if (sondecimales[0] || sondecimales[1]) {

        const num1 = bt1.split(".");
        const num2 = bt2.split(".");


        if (num1[0].length > num2[0].length) {
            return true
        } else if (num1[0].length < num2[0].length) {
            return false
        } else if (num1[0].length == num2[0].length) {

            if (!num1[1] || !num2[1]) {
                if (!num1[1]) {
                    return false
                } else {
                    return true
                }
            } else if (num1[0] != num2[0]) {

                for (let i = 0; i < num1[0].length; i++) {
                    if (parseInt(num1[0][i]) < parseInt(num2[0][i])) {
                        return false
                    } else if (parseInt(num1[0][i]) > parseInt(num2[0][i])) {
                        return true
                    }

                }
            } else {
                const counter = num1[1].length > num2[1].length ? num1[1].length : num2[1].length;

                for (let i = 0; i < counter; i++) {

                    if (!num1[1][i] || !num2[1][i]) {
                        if (!num1[1][i]) {
                            return false
                        } else {
                            return true
                        }
                    } else if (parseInt(num1[1][i]) < parseInt(num2[1][i])) {
                        return false
                    } else if (parseInt(num1[1][i]) > parseInt(num2[1][i])) {
                        return true
                    }

                }
                return false
            }

        }

    } else {
        if (bt1.length > bt2.length) {
            return true
        } else if (bt1.length < bt2.length) {
            return false
        } else {
            if (bt1 != bt2) {

                for (let i = 0; i < bt1.length; i++) {
                    if (parseInt(bt1[i]) < parseInt(bt2[i])) {
                        return false
                    } else if (parseInt(bt1[i]) > parseInt(bt2[i])) {
                        return true
                    }
                }

            } else {
                return false
            }
        }
    }

}

// CONVIERTE UN NUMERO DECIMAL A ENTERO
const decimal_to_entero = (a, b) => {

    const comas_arr = [get_cant_comas(a), get_cant_comas(b)];
    let comas = 0;

    if (!a.includes(".")) {
        a += ".";
    }



    if (!b.includes(".")) {
        b += ".";
    }

    const index = [a.indexOf('.'), b.indexOf('.')];


    for (let i = 0; i < comas_arr.length; i++) {
        if (comas_arr[i] > comas) {
            comas = comas_arr[i];
        }
    }



    a = a.trim().split("");

    b = b.trim().split("");


    for (let i = 1; i <= comas; i++) {
        // console.log(reverse_element(a)[i]);
        // console.log(reverse_element(b)[i]);


        if (a[index[0] + i] == undefined) {
            a[index[0] + i] = 0;
        }
        if (b[index[1] + i] == undefined) {
            b[index[1] + i] = 0;
        }
    }
    a = a.join("").replace(".", "");
    b = b.join("").replace(".", "");



    return { comas, a, b }

}

// SABER SI EL NUMERO ES NEGATIVO
const is_negative = (a) => {
    return a.toString().includes("-")
};

//.................................... TOOLS ...............................................//


//.................................... ENTEROS ...............................................//

const sumar_enteros = (a, b) => {


    a = a.toString().trim();
    b = b.toString().trim();

    if (a.length <= b.length) {
        const toad = b.length - a.length;
        a = repeat(toad, "0") + a;
    } else {
        const toad = a.length - b.length;
        b = repeat(toad, "0") + b;
    }

    let extra = 0;
    let result = [];



    a = reverse_element(a);
    b = reverse_element(b);



    for (let i = 0; i < b.length; i++) {
        let dig = parseInt(a[i]) + parseInt(b[i]) + extra
        extra = "";
        if (dig.toString().length > 1 && b[i + 1] != undefined) {
            dig = dig.toString();
            extra = parseInt(dig.substring(0, dig.length - 1));
            result.push(dig[dig.length - 1]);
        } else {
            result.push(dig.toString());
        }

    }

    return result.reverse().join("")
}

const multiplicacion_enteros = (nu1, nu2) => {
    let a
    let b

    if (nu2.toString().length <= nu1.toString().length) {
        a = nu1
        b = nu2
    } else {
        a = nu2
        b = nu1
    }


    a = reverse_element(a);
    b = reverse_element(b);



    const final_sum = []


    b = b.trim();
    a = a.trim()
    for (let d2 = 0; d2 < b.length; d2++) {
        const num1 = b[d2];
        const toSum = [];

        for (let d1 = 0; d1 < a.length; d1++) {
            toSum.push((a[d1] * num1).toString() + repeat(d1, '0'));

        }

        let result = "";
        for (let i = 0; i < toSum.length; i++) {

            if (i == 0) {
                result = toSum[i];
            } else {
                result = sumar_enteros(toSum[i], result)
            }

        }


        final_sum.push(result + repeat(d2, '0'))

    }

    let result = "";
    for (let i = 0; i < final_sum.length; i++) {
        if (i == 0) {
            result = final_sum[i];
        } else {

            result = sumar_enteros(final_sum[i], result)
        }
    }


    return result

}

const division_enteros = (dividendo, divisor) => {
    let resto = "0";
    let cociente = "";
    let operando = "";
    dividendo = dividendo.toString();



    for (let i = 0; i < dividendo.length; i++) {
        operando += dividendo[i];

        if (BigInt(operando) >= BigInt(divisor)) {

            let bre = 0;
            let divisor_torest;

            do {

                divisor_torest = multiplicacion_enteros(divisor, bre);
                if (BigInt(divisor_torest) > BigInt(operando)) {
                    bre--
                    divisor_torest = multiplicacion_enteros(divisor, bre);
                    break
                }
                bre++


            } while (true);


            cociente += bre;

            resto = reemplazar_ceros(resta_enteros(operando, divisor_torest));

            operando = "" + resto;




        } else {
            cociente += "0"
            resto = "" + operando;

        }

    }

    return {
        cociente: cociente,
        resto: resto
    }

}

const resta_enteros = (a, b) => {


    a = a.toString().trim();
    b = b.toString().trim();

    const sign = (BigInt(a) < BigInt(b)) ? ('-') : ('');




    if (a.length < b.length) {
        const toad = b.length - a.length;
        a = repeat(toad, "0") + a;
    } else if (b.length < a.length) {
        const toad = a.length - b.length;
        b = repeat(toad, "0") + b;
    }

    let result = [];


    if (BigInt(a) < BigInt(b)) {
        let ap = a;

        a = b;
        b = ap;
    }


    a = reverse_element(a);
    b = reverse_element(b);


    let extra = 0;

    for (let i = 0; i < a.length; i++) {
        let aP = parseInt(a[i]);
        let bP = parseInt(b[i]);
        let deb = false;
        if (aP - extra < bP) {

            aP += 10
            deb = true;
        }
        let dig = (aP - extra) - bP;

        extra = (deb) ? (1) : (0);
        result.push(dig.toString());




    }



    return `${sign}${ result.reverse().join("")}`
}

//.................................... ENTEROS ...............................................//


//.................................... DECIMALES ...............................................//

const multiplicacion_decimales = (a, b) => {
    let comas = 0;

    a = a.toString().trim();
    b = b.toString().trim();

    const comas_arr = [get_cant_comas(a), get_cant_comas(b)];

    for (let i = 0; i < comas_arr.length; i++) {
        comas += comas_arr[i]
    }

    let result = multiplicacion_enteros(a.replace(".", ""), b.replace(".", ""));
    result = result.split("").reverse();
    result[comas] = result[comas] + ".";


    return result.reverse().join("")

}

const division_decimales = (a, b) => {

    const sign = (!compare_Bi(a, b) && a != b) ? ('-') : ('');
    let comas = 0;

    a = a.toString().trim();
    b = b.toString().trim();



    const data = decimal_to_entero(a, b);


    a = data["a"];
    b = data["b"];
    comas = data["comas"];


    let result = division_enteros(a, b);
    return result

}

const resta_decimales = (a, b) => {
    let comas = 0;

    a = a.toString().trim();
    b = b.toString().trim();


    const sign = (!compare_Bi(a, b) && a != b) ? ('-') : ('');


    const data = decimal_to_entero(a, b);


    a = data["a"];
    b = data["b"];
    comas = data["comas"];

    let result = resta_enteros(a, b);


    result = reverse_element(result).split("");
    result[comas - 1] += "."
    return sign + reverse_element(result.join(""));
}

const suma_decimales = (a, b) => {
    let comas = 0;

    a = a.toString().trim();
    b = b.toString().trim();

    // const sign = (!compare_Bi(a, b) && a != b) ? ('-') : ('');


    const data = decimal_to_entero(a, b);


    a = data["a"];
    b = data["b"];
    comas = data["comas"];

    let result = sumar_enteros(a, b);


    result = reverse_element(result).split("");
    result[comas - 1] += "."
    return reverse_element(result.join(""));
}

//.................................... DECIMALES ...............................................//





const parseEntero = (a = '') => {

    if (parseInt(a) != 0) {
        a = reemplazar_ceros(a)
        const index = a.indexOf(".");
        a = a.substring(0, (index == -1) ? (undefined) : (index));
        return a
    } else {
        return parseInt(a).toString()
    }

}

const parseDecimal = (a = '') => {
    a = reemplazar_ceros(a)
    const index = a.indexOf(".");
    if (!a[index + 1]) {
        a += 0;
    }
    return a
}



const derivador = (op, cbd, cbe) => {

    if (op.includes('d')) {
        return cbd
    } else {
        return cbe
    }

}
const calculador = (op) => {

    try {
        op.a = op.a.toString();
    } catch (error) {

    }

    try {
        op.b = op.b.toString();
    } catch (error) {

    }
    switch (op.op) {
        case "pd":
            return parseDecimal(op.a)

        case "pe":
            return parseEntero(op.a)

        case "d*":
        case "*":
            return derivador(op.op, multiplicacion_decimales, multiplicacion_enteros)(op.a, op.b)
        case "d+":
        case "+":

            return derivador(op.op, suma_decimales, sumar_enteros)(op.a, op.b)

        case "d-":
        case "-":

            return derivador(op.op, resta_decimales, resta_enteros)(op.a, op.b)


        case "d/":
        case "/":

            return derivador(op.op, division_decimales, division_enteros)(op.a, op.b).cociente

        case "d/%":
        case "/%":

            return derivador(op.op, division_decimales, division_enteros)(op.a, op.b)


        case "d%":
        case "%":

            return derivador(op.op, division_decimales, division_enteros)(op.a, op.b).resto

    }
}


const calcular_decimal = (formula = []) => {



    let resultado = '';


    const fomula_depurada = [];

    for (let i = 0; i < formula.length; i) {
        const f = formula[i];

        if (i == 0) {
            if (!isNaN(f)) {
                resultado = f;
                fomula_depurada.push({ a: f, op: 'resultado', b: undefined })
            } else {
                i++
                fomula_depurada.push({ a: formula[i], op: f, b: undefined })

            }
        } else {
            if (f == 'pd' || f == "pe") {

                fomula_depurada.push({ a: 'resultado', op: f, b: undefined })
            } else {

                i++
                fomula_depurada.push({ a: 'resultado', op: f, b: formula[i] })
            }
        }
        i++

    }




    for (let i = 0; i < fomula_depurada.length; i++) {

        const f = fomula_depurada[i];

        if (f.op == "resultado") {
            resultado = f.a
        } else {
            if (resultado != '') {
                f['a'] = resultado;
            }
            resultado = calculador(f);
        }
    }

    return resultado
}