const Queue = require("./Queue");
const TokenBuffer = require("./TokenBuffer");
const Token = require("./Token");

function isWhiteSpace(c) {
    return [" ", "\t", "\n", "\r"].includes(c);
}

function isSymbol(c) {
    return ["{", "}", "(", ")", ",", ";", "=", "+", "-", "==", "<=", ">="].includes(c);
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
        let next = q.peek();
        if (isWhiteSpace(next)) {
            q.consume();
            ts.endCurrentToken();
        } else if (isSymbol(next)) {
            ts.pushToken(lexSymbol(q));
        } else {
            ts.pushChar(q.consume());
        }
    }

    ts.endCurrentToken();

    return ts.tokens;
}

function lexSymbol(q) {
    let symbol = q.consume();
    return new Token("symbol", symbol);
}


module.exports = lex;