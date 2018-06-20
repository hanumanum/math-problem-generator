let eq = document.getElementById("eq");
let levels = document.getElementById("levels");
let regen = document.getElementById("regen");
let dwnl = document.getElementById("dwnl");
let problem = document.getElementById("problem");

let tva = document.getElementById("tva");
let tvb = document.getElementById("tvb");
let tvc = document.getElementById("tvc");
let tvx = document.getElementById("tvx");
let testing = document.getElementById("testing");
let langUrl = "https://hanumanum.github.io/math-problem-generator/langs/";
let lang = "en";
let gendate = document.getElementById("gendate");

Array.prototype.rnd = function () {
    return this[Math.floor(Math.random() * this.length)]
}

//TODO: remove later, just for testing
levels.value = 1;
getNewEq();

levels.addEventListener("change", function () {
    getNewEq();
})

regen.addEventListener("click", function () {
    getNewEq();
})

dwnl.addEventListener("click", function () {
    printToFile(problem);
})


$('input[type=radio]').change(function () {
    lang = $(this).val();
    translateAll(lang);
});

function getNewEq() {
    e = newEq(levels.value);
    gendate.innerHTML = nowFormatted();
    eq.innerHTML = e.jax;
    MathJax.Hub.Typeset();
    udpateSelfTestValues(e);
}

function udpateSelfTestValues(e) {
    if (e.x === 0) {
        testing.style.visibility = "hidden";
    }
    else {
        testing.style.visibility = "initial";
        tva.innerHTML = e.a;
        tvb.innerHTML = e.b;
        tvc.innerHTML = e.c;
        tvx.innerHTML = e.x;
    }

}

function newEq(level = 1) {
    let checks = {
        jax: "",
        a: 0,
        b: 0,
        c: 0,
        x: 0
    };

    let ops = ["+", "-"];
    let n1 = randomInt(5, 30);
    let n2 = randomInt(4, 30);
    let n3 = randomInt(2, 30);
    let p = randomInt(4, 8);
    let op1 = ops.rnd();
    let op2 = ops.rnd();
    checks.a = randomInt(5, 10);
    checks.b = randomInt(6, 20);
    checks.c = randomInt(8, 10);


    if (level === "1") {
        checks.jax = "$$x = " + n1 + "a(b-" + 12 + ")" + op1 + n2 + "b" + op2 + "c$$";
        checks.x = n1 * checks.a * (checks.b - 12) + ((op1 == "-") ? (-1) : 1) * n2 * checks.b + ((op2 == "-") ? (-1) : 1) * checks.c;
    }
    else if (level === "2") {
        checks.jax = "$$x = " + n1 + "a^" + p + op1 + n2 + "b" + op2 + "c$$";
        checks.x = n1 * Math.pow(checks.a, p) + ((op1 == "-") ? (-1) : 1) * n2 * checks.b + ((op2 == "-") ? (-1) : 1) * checks.c;
    }
    else if (level === "3") {
        checks.jax = "$$x = " + n1 + "\\sqrt{a}" + op1 + n2 + "b" + op2 + "c$$";
        checks.x = n1 * Math.sqrt(checks.a) + ((op1 == "-") ? (-1) : 1) * n2 * checks.b + ((op2 == "-") ? (-1) : 1) * checks.c;
    }
    else if (level === "4") {
        checks.jax = "$$x = \\frac{" + n1 + "a^" + p + op1 + n2 + "b" + op2 + "c} {" + n3 + "}$$";
        checks.x = (n1 * Math.pow(checks.a, p) + ((op1 == "-") ? (-1) : 1) * n2 * checks.b + ((op2 == "-") ? (-1) : 1) * checks.c) / n3;
    }
    else if (level === "5") {
        checks.jax = "$$x = \\frac{" + n1 + "a^" + p + op2 + n2 + "b+c} {" + "\\sqrt{a}" + op1 + n3 + "|c|}$$";
        checks.x = (n1 * Math.pow(checks.a, p) + ((op1 == "-") ? (-1) : 1) * n2 * checks.b + checks.c) / (Math.sqrt(checks.a) - ((op2 == "-") ? (-1) : 1) * n3 * Math.abs(checks.c));
    }

    return checks;

}


function randomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}


function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.getElementsByTagName("body")[0].appendChild(link);
    link.click();
    link.remove();

}

function printToFile(div) {
    html2canvas(div, {
        onrendered: function (canvas) {
            var myImage = canvas.toDataURL("image/png");
            var fileName = Date.now();
            downloadURI("data:" + myImage, "math-problem-generator" + fileName + ".png");
        }
    });
}



function translateAll(lng) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var txt_strs = JSON.parse(this.responseText);
            for (var txt_st in txt_strs) {
                console.log(txt_st, txt_strs[txt_st]);
                var trans = document.getElementById(txt_st);
                if (trans) {
                    trans.innerHTML = txt_strs[txt_st];
                }

            }

        }
    };
    xhttp.open("GET", langUrl + lng + ".json", true);
    xhttp.send();
}

function nowFormatted(){
    let d = new Date();
    return d.getFullYear() + "-" +  d.getMonth() + "-" + d.getDay() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}