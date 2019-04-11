const Queue = require("./Queue");

function parse(tokens) {
    const q = new Queue(tokens);
    return parseProgram(q);
}

// program             : function_definition* expression ';'                ;
function parseProgram(q) {
    return {
        type: "program",
        functions : [],
        expression : null
    };
}

module.exports = parse;