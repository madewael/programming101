"use strict";

document.addEventListener("DOMContentLoaded", init);

function buildToc() {
    function getTitle($elem) {
        return $elem.querySelector("h1").innerHTML;
    }

    let list = "<ul>";
    document.querySelectorAll("div[data-type='part']").forEach( $part => {
        list += "<li>";
        list += `<a href="#${$part.id}">${getTitle($part)}</a>`;
        list += "<ul>";

        $part.querySelectorAll("section[data-type='chapter']").forEach($chapter => {
            list += `<li><a href="#${$chapter.id}">${getTitle($chapter)}</a></li>`;
        });

        list += "</ul>";
        list += "</li>";

    });
    list += "</ul>";


    const $toc =document.getElementById("toc");
    $toc.innerHTML = `<h1>${document.title}</h1>\n${list}`;
}

function fetchCode($code) {
    const src = $code.getAttribute("data-src");

    const from = parseInt($code.getAttribute("data-from"));
    const to = parseInt($code.getAttribute("data-to"));

    function partition(txt) {
        if (!isNaN(from) && !isNaN(to)) {
            return txt.split("\n").slice(from-1, to).join("\n");
        } else {
            return txt;
        }
    }

    fetch(src)
        .then(res => res.text())
        .then(partition)
        .then(txt => $code.innerHTML = txt)
        .then(() => hljs.highlightBlock($code));
}

function init() {
    console.log("DOMContentLoaded");
    document.querySelectorAll("figure pre code[data-src]").forEach(fetchCode);
    buildToc();
}

