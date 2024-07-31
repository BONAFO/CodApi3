const { getContext } = require("../Utils/context_api");
const { update_individual_manfiest } = require("../Utils/context_update");

(() => {
    const context = getContext();
    context.map((c, ci) => {
        c.weapons.map((w, wi) => {
            w.data.map((wd, di) => {
                context[ci].weapons[wi].data[di].exp = 0;
            })
            update_individual_manfiest(context[ci].weapons[wi])
        })

    })

})()