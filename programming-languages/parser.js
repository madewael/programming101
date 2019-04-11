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

function parseOptional(parser, q) {
    try {
        return tryParse(parser, q);
    } catch (err) {
        return false;
    }
}

function parseSequence(parser, q, start = false, stop = false, sep = false) {
    function wrapWithSeparatorParsing(parser) {
        let first = true;
        return function (q) {
            if (first) {
                first = false;
            } else {
                q.consume().ensure("symbol", sep);
            }
            return parser(q);
        }
    }

    parser = sep ? wrapWithSeparatorParsing(parser) : parser;

    if (start) {
        q.consume().ensure("symbol", start);
    }

    const sequence = [];
    while (true) {
        try {
            sequence.push(tryParse(parser, q));
        } catch (err) {
            break;
        }
    }

    if (stop) {
        q.consume().ensure("symbol", stop);
    }

    return sequence;
}

function parse(tokens) {
    const q = new Queue(tokens);
    return parseProgram(q);
}

// program             : function_definition* expression ';'                ;
function parseProgram(q) {
    const functions = parseFunctionDefinitionList(q);
    const expression = parseExpression(q);
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
    return parseSequence(parseFunctionDefinition, q);
}

// function_definition : 'function' Identifier '(' parameter_list ')' block ;
function parseFunctionDefinition(q) {
    parseFunctionKeyword(q);
    const name = parseIdentifier(q).value;
    const paramList = parseParamList(q);
    const body = parseBlock(q);

    return {
        type: "function-def",
        name: name,
        paramList: paramList,
        body: body
    }
}

function parseParamList(q) {
    return parseSequence(parseIdentifier, q, "(", ")", ",")
        .map(identifier => identifier.value);
}

function parseBlock(q) {
    return parseSequence(parseStatement, q, "{", "}");
}

function parseStatement(q) {
    const parsers = [
        parseVariableDefinition,
        parseVariableAssignment,
        parseWhileStatement,
        parseReturnStatement,
        parseBlock
    ];

    for (const parser of parsers) {
        try {
            return tryParse(parser, q);
        } catch (err) {
            // parse error, hence, try next parser ...
        }
    }
    throw new Error("Parser error: un-parsable statement");
}

function parseVariableDefinition(q) {
    function parseInitValue(q) {
        q.consume().ensure("symbol", "=");
        return parseExpression(q);
    }

    q.consume().ensure("keyword", "let");
    const variable = parseIdentifier(q).value;
    const initValue = parseOptional(parseInitValue, q);
    q.consume().ensure("symbol", ";");

    return {
        type: "variable-definition",
        variable: variable,
        initValue: initValue
    }

}

function parseVariableAssignment(q) {
    const variable = parseIdentifier(q).value;
    q.consume().ensure("symbol", "=");
    const value = parseExpression(q);
    q.consume().ensure("symbol", ";");

    return {
        type: "variable-assignment",
        variable: variable,
        value: value
    }
}

function parseWhileStatement(q) {
    q.consume().ensure("keyword", "while");
    q.consume().ensure("symbol", "(");
    const condition = parseExpression(q).value;
    q.consume().ensure("symbol", ")");
    const body = parseStatement(q);

    return {
        type: "while-statement",
        condition: condition,
        body: body
    }
}

function parseReturnStatement(q) {
    q.consume().ensure("keyword", "return");
    const value = parseExpression(q).value;
    q.consume().ensure("symbol", ";");

    return {
        type: "return-statement",
        value: value
    }
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