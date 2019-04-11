const lex = require("./lexer");
const parse = require("./parser");
const fs = require('fs');

fs.readFile("./demo-programs/sum.tpl", "utf8", (err, txt) => {
    console.log(parse(lex(txt)));
});

fs.readFile("./demo-programs/func.tpl", "utf8", (err, txt) => {
    console.log(parse(lex(txt)));
});

fs.readFile("./demo-programs/while.tpl", "utf8", (err, txt) => {
    console.log(parse(lex(txt)));
});
