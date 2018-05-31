let eq = document.getElementById("eq");
let levels = document.getElementById("levels");
let regen = document.getElementById("regen");
let dwnl = document.getElementById("dwnl");


//TODO: remove later, just for testing
levels.value = 1;

eq.innerHTML = newEq(levels.value);
MathJax.Hub.Typeset();


levels.addEventListener("change", function () {
    eq.innerHTML = newEq(levels.value);
    MathJax.Hub.Typeset();
})

regen.addEventListener("click", function () {
    eq.innerHTML = newEq(levels.value);
    MathJax.Hub.Typeset();
})

dwnl.addEventListener("click", function () {
    printToFile(eq);
})

function newEq(level = 1) {
    console.log(level);
    let ops = ["+", "-"];
    let n1 = randomInt(5, 30);
    let n2 = randomInt(4, 30);
    let n3 = randomInt(2, 30);
    let p = randomInt(4, 8);
    let op1 = randomInt(0, 2);
    let op2 = randomInt(0, 2);

    if (level === "1") {
        return "$$x = " + n1 + "a(b-" + 12 + ")" + ops[op1] + n2 + "b" + ops[op2] + "c$$";
    }
    else if (level === "2") {
        return "$$x = " + n1 + "a^" + p + ops[op1] + n2 + "b" + ops[op2] + "c$$";
    }
    else if (level === "3") {
        return "$$x = " + n1 + "\\sqrt{a}" + ops[op1] + n2 + "b" + ops[op2] + "c$$";

    }
    else if (level === "4") {
        return "$$x = \\frac{" + n1 + "a^" + p + "+" + n2 + "b+c} {" + n3 + "}$$";
    }
    else if (level === "5") {
        return "$$x = \\frac{" + n1 + "a^" + p + ops[op2] + n2 + "b+c} {" + "\\sqrt{a}" + ops[op1] + n3 + "|c|}$$";
    }

}


function randomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}



function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

function printToFile(div) {
    html2canvas(div, {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            var fileName = Date.now();
            downloadURI("data:" + myImage, "math-problem-generator-" + fileName + ".png");
        }
    });
}