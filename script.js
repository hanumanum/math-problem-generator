let eq = document.getElementById("eq");
let levels = document.getElementById("levels");
let regen = document.getElementById("regen");

//TODO: remove later, just for testing
//levels.value = 2;

eq.innerHTML = newEq(levels.value);
MathJax.Hub.Typeset();


levels.addEventListener("change",function(){
    eq.innerHTML = newEq(levels.value);
    MathJax.Hub.Typeset();
})

regen.addEventListener("click",function(){
    eq.innerHTML = newEq(levels.value);
    MathJax.Hub.Typeset();
})

function newEq(level){
    console.log(level);
    let ops = ["+","-"];
    let n1 =  randomInt(5,30);
    let n2 =  randomInt(4,30);
    let n3 =  randomInt(2,30);
    let p =  randomInt(4,8);
    let op1 = randomInt(0,2);
    let op2 = randomInt(0,2);

    if(level==="1"){
        return "$$x = "+n1+"a^"+p+ops[op1]+n2+"b"+ops[op2]+"c$$";
    }
    else if (level==="2"){
        return "$$x = "+n1+ "\\sqrt{a}"+ops[op1]+n2+"b"+ops[op2]+"c$$";

    }
    else if (level==="3"){
        return "$$x = \\frac{"+n1+"a^"+p+"+"+n2+"b+c} {"+n3+"}$$";
    }
}


function randomInt(min, max){
    return parseInt(Math.random() * (max - min) + min);
}