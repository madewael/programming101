const Queue = require("./Queue");

function tryParse(parser, q) {
    const old = q.arr.slice();
    try {
        return parser(q);
    } catch (err) {
        q.arr = old;
        throw err;
    }
}

function parse(tokens) {
    const q = new Queue(tokens);
    return parseProgram(q);
}

// program             : function_definition* expression ';'                ;
function parseProgram(q) {
    const functions = parseFunctionDefinitionList(q);
    const expression =  parseExpression(q);
    parseSemicolon(q); // ignore, but do parse !

    if (q.hasMore()) {
        let next = JSON.stringify(q.peek());
        throw new Error(`Parse error: reached end of program, but still found tokens (next: ${next})`);
    }

    return {
        type: "program",
        functions: functions,
        expression: expression
    };
}

function parseFunctionDefinitionList(q) {
    try {
        const firstFunctionDefinition = tryParse(parseFunctionDefinition, q);
        return [firstFunctionDefinition];
    } catch (err) {
        return [];
    }
}

// function_definition : 'function' Identifier '(' parameter_list ')' block ;
function parseFunctionDefinition(q) {
    parseFunctionKeyword(q);
    const name = parseIdentifier(q).value;
    const paramList = parseParamList(q);
    const body = parseBlock(q);

    return {
        type :"function-def",
        name : name,
        paramList : paramList,
        body : body
    }
}

function parseParamList(q) {
    const res = [];
    let curr = q.consume();
    curr.ensure("symbol", "("); // start with open round bracket

    curr = q.consume();
    while (!curr.is("symbol", ")")) { // continue until close round bracket
        res.push(curr); // ignore structure in between
        curr = q.consume();
    }

    return res;
}

function parseBlock(q) {
    const res = [];
    let curr = q.consume();
    curr.ensure("symbol", "{"); // start with open curly bracket

    curr = q.consume();
    while (!curr.is("symbol", "}")) { // continue until close curly bracket
        res.push(curr); // ignore structure in between
        curr = q.consume();
    }

    return res;
}

function parseExpression(q) {
    return parseInteger(q); // todo: there exist more kinds of expressions
}

function parseInteger(q) {
    const integer = q.consume();
    integer.ensure("integer");
    return {
        type: "integer",
        value: integer.value
    };
}

function parseIdentifier(q) {
    const identifier = q.consume();
    identifier.ensure("identifier");
    return {
        type: "identifier",
        value: identifier.value
    };
}

function parseSemicolon(q) {
    q.consume().ensure("symbol", ";");
}

function parseFunctionKeyword(q) {
    q.consume().ensure("keyword", "function");
}


module.exports = parse;