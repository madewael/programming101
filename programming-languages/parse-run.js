const lex = require("./lexer");
const parse = require("./parser");
const fs = require('fs');


function tryParse(fn) {
    fs.readFile(fn, "utf8", (err, txt) => {
        try {
            console.log(parse(lex(txt)));
        } catch (err) {
            console.log("ERR in", fn, ":", err.message);
        }
    });
}

tryParse("./demo-programs/one.tpl");
tryParse("./demo-programs/one2.tpl");
tryParse("./demo-programs/one3.tpl");
tryParse("./demo-programs/one4.tpl");
tryParse("./demo-programs/one5.tpl");
