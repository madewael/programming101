const Queue = require("./Queue");
const TokenBuffer = require("./TokenBuffer");
const Token = require("./Token");

function isWhiteSpace(c) {
    return [" ", "\t", "\n", "\r"].includes(c);
}

function isSymbol(c) {
    return ["{", "}", "(", ")", ",", ";", "=", "+", "-"].includes(c);
}

function isKeyword(str) {
    return ["function", "let", "while", "return", "if", "else"].includes(str);
}

function determineTokenType(str) {
    if (isKeyword(str)) {
        return new Token("keyword", str);
    } else if (!isNaN(parseInt(str))) {
        return new Token("integer", parseInt(str));
    } else {
        return new Token("identifier", str);
    }
}

function lex(txt) {
    let q = new Queue(txt);
    let ts = new TokenBuffer(determineTokenType);

    while (q.hasMore()) {
        let next = q.consume();
        if (isWhiteSpace(next)) {
            ts.endCurrentToken();
        } else if (isSymbol(next)) {
            ts.pushToken(new Token("symbol", next));
        } else {
            ts.pushChar(next);
        }
    }

    ts.endCurrentToken();

    return ts.tokens;
}

module.exports = lex;