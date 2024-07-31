const { getContext } = require("../Utils/context_api");
const { update_game_context } = require("../Utils/context_update");



(() => {
    const context = getContext();

    context.map(cont => {
        update_game_context(cont)

    })
})()