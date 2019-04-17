const lex = require("./lexer");
const fs = require('fs');

/*
fs.readFile("./demo-programs/sum.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});

fs.readFile("./demo-programs/func.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});

fs.readFile("./demo-programs/while.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});

fs.readFile("./demo-programs/one.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});

fs.readFile("./demo-programs/if.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});*/

fs.readFile("./demo-programs/comp.tpl", "utf8", (err, txt) => {
    console.log(lex(txt));
});
